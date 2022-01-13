import assign from "lodash/assign";
import fill from "lodash/fill";
import escapeRegExp from "lodash/escapeRegExp";
import getTypeOf from "./getTypeOf";
import isValidRegExp from "./isValidRegExp";

export function isValidInput(data: unknown): boolean {
  const isObject = (val: any) => typeof val === "object" && val !== null;
  return (
    Array.isArray(data) &&
    data.every((row: any) => Array.isArray(row) || isObject(row))
  );
}

export interface normalisedField {
  key: string;
  value: any;
  hasValue: boolean;
  type:
    | "string"
    | "number"
    | "boolean"
    // | "bigint"
    | "array"
    | "object"
    | "null"
    | "undefined"
    | "symbol";
}

export type normalisedRow = normalisedField[];

export function normaliseInput(data: any[]): normalisedRow[] {
  // in the case that an array (data) of arrays (rows) has been provided [[],[],[]], convert to [{},{},{}]
  data = data.map((row) => ({ ...row }));

  // Normalise each field
  const normaliseField = (field: string, value: any): normalisedField => ({
    key: field,
    value,
    type: getTypeOf(value),
    hasValue: value !== null || value !== undefined,
  });
  data = data.map(
    (row): normalisedRow => {
      return Object.keys(row).map(
        (key): normalisedField => normaliseField(key, row[key])
      );
    }
  );

  // In the case that an array of objects has been passed in with different fields, ensure that all rows include all fields and in the same order.
  const fields = getFields(data);
  data = data.map((row) => {
    return fields.map((field) => {
      return (
        row.find((_field: normalisedField) => _field.key === field) ||
        normaliseField(field, undefined)
      );
    });
  });

  return data;
}

export function getFields(rows: normalisedRow[]): string[] {
  const fields = new Set<string>();

  for (const row of rows) {
    for (const field of row) {
      fields.add(field.key);
    }
  }

  return Array.from(fields);
}

type ExcludesFalse = <T>(x: T | false) => x is T;

export function pickFields(
  rows: normalisedRow[],
  pickFields: string[]
): normalisedRow[] {
  return rows.map((row) => {
    return pickFields
      .map((pickField) => row.find((field) => field.key === pickField) || false)
      .filter((Boolean as any) as ExcludesFalse);
  });
}

export function getPaginated(options: {
  rows: normalisedRow[];
  page: number;
  perPage: number;
  withPlaceholders: boolean;
}): (normalisedRow | null)[] {
  let { rows = [] } = options;
  const { page = 1, perPage = 25, withPlaceholders = false } = options;

  const start = perPage * page;
  const end = start + perPage;

  rows = rows.slice(start, end);

  // provide placeholders when page does not meet perPage threshold
  if (withPlaceholders && rows.length !== perPage) {
    return assign(fill(new Array(perPage), null), rows);
  }

  return rows;
}

const matchesSearch = (options: {
  value: string;
  searchQuery: string;
  matchCase: boolean;
  matchWord: boolean;
  useRegExp: boolean;
}): boolean => {
  let { value = "", searchQuery = "" } = options;
  const { matchCase = false, matchWord = false, useRegExp = false } = options;

  const flags = [!matchCase && "i", "g"].filter(Boolean).join("");

  if (matchWord) {
    searchQuery = `\\b(${searchQuery})\\b`;
  }

  if (!useRegExp) {
    value = escapeRegExp(value);
  }

  return new RegExp(searchQuery, flags).test(value);
};

export function search(options: {
  rows: normalisedRow[];
  searchQuery: string;
  useRegExp: boolean;
  matchCase: boolean;
  matchWord: boolean;
}): normalisedRow[] {
  let { searchQuery = "" } = options;

  const {
    rows,
    useRegExp = false,
    matchCase = false,
    matchWord = false,
  } = options;

  // escape regex
  if (!useRegExp || !isValidRegExp(searchQuery)) {
    searchQuery = escapeRegExp(searchQuery);
  }

  return rows.filter((row): boolean => {
    return row.some((field): boolean => {
      const value = field.value;
      if (getTypeOf(value)) {
        return matchesSearch({
          value: String(value ?? ""),
          searchQuery,
          matchCase,
          matchWord,
          useRegExp,
        });
      }
      return false;
    });
  });
}

export default {
  isValidInput,
  normaliseInput,
  getFields,
  pickFields,
  getPaginated,
  search,
};
