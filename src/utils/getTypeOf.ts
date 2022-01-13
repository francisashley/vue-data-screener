type returnType =
  | "string"
  | "number"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "null"
  | "array"
  | "object";

export default function (value: unknown): returnType {
  if (typeof value === "string") {
    return "string";
  } else if (typeof value === "number") {
    return "number";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (typeof value === "symbol") {
    return "symbol";
  } else if (typeof value === "undefined") {
    return "undefined";
  } else if (typeof value === "object") {
    if (value === null) {
      return "null";
    } else if (Array.isArray(value)) {
      return "array";
    }
    return "object";
  }

  throw `Could not establish type of \`${value}\``;
}
