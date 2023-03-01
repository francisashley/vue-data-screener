import { escapeRegExp } from "./regex.utils";
import getTypeOf from "./getTypeOf";
import { isValidRegExp } from "../utils/regex.utils";

export function isValidInput(data: unknown): boolean {
  const isObject = (val: unknown) => typeof val === "object" && val !== null;
  return Array.isArray(data) && data.every((row: unknown) => Array.isArray(row) || isObject(row));
}

export interface normalisedField {
  key: string;
  value: unknown;
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

export interface UnknownObject {
  [key: string | number]: unknown;
}

export function normaliseInput(data: UnknownObject[]): normalisedRow[] {
  // in the case that an array (data) of arrays (rows) has been provided [[],[],[]], convert to [{},{},{}]
  data = data.map((row) => (Array.isArray(row) ? { ...row } : row));

  // Normalise each field
  const normaliseField = (field: string, value: unknown): normalisedField => ({
    key: field,
    value,
    type: getTypeOf(value),
    hasValue: value !== null || value !== undefined,
  });

  let normalisedData = data.map(
    (row: UnknownObject): normalisedRow => {
      return Object.keys(row).map((key): normalisedField => normaliseField(key, row[key]));
    }
  );

  // In the case that an array of objects has been passed in with different fields, ensure that all rows include all fields and in the same order.
  const fields = getFields(normalisedData);
  normalisedData = normalisedData.map((row) => {
    return fields.map((field) => {
      return (
        row.find((_field: normalisedField) => _field.key === field) ||
        normaliseField(field, undefined)
      );
    });
  });

  return normalisedData;
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

export function pickFields(rows: normalisedRow[], pickFields: string[]): normalisedRow[] {
  return rows.map((row) => {
    return pickFields
      .map((pickField) => row.find((field) => field.key === pickField) || false)
      .filter((Boolean as unknown) as ExcludesFalse);
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
    const emptyRows = Array(perPage).fill(null);
    return Object.assign(emptyRows, rows);
  }

  return rows;
}

const meetsCriteria = (
  inputText: string,
  pattern: string,
  options: {
    matchCase: boolean;
    matchWord: boolean;
    useRegExp: boolean;
  }
): boolean => {
  const { matchCase = false, matchWord = false, useRegExp = false } = options;

  const flags = matchCase ? "g" : "gi";

  if (matchWord) {
    pattern = `\\b(${pattern})\\b`;
  }

  if (!useRegExp) {
    inputText = escapeRegExp(inputText);
  }

  return new RegExp(pattern, flags).test(inputText);
};

export function search(options: {
  rows: normalisedRow[];
  searchQuery: string;
  useRegExp: boolean;
  matchCase: boolean;
  matchWord: boolean;
}): normalisedRow[] {
  let { searchQuery = "" } = options;

  const { rows, useRegExp = false, matchCase = false, matchWord = false } = options;

  // escape regex
  if (!useRegExp || !isValidRegExp(searchQuery)) {
    searchQuery = escapeRegExp(searchQuery);
  }

  return rows.filter((row): boolean => {
    return row.some((field): boolean => {
      const value = String(field.value ?? "");
      if (getTypeOf(value)) {
        return meetsCriteria(String(field.value ?? ""), searchQuery, {
          matchCase,
          matchWord,
          useRegExp,
        });
      }
      return false;
    });
  });
}
