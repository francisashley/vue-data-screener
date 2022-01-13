import getTypeOf from "./getTypeOf";

test("Identifies boolean", () => {
  expect(getTypeOf(true)).toBe("boolean");
  expect(getTypeOf(false)).toBe("boolean");
});

test("Identifies null", () => {
  expect(getTypeOf(null)).toBe("null");
});

test("Identifies undefined", () => {
  expect(getTypeOf(undefined)).toBe("undefined");
});

test("Identifies number", () => {
  expect(getTypeOf(1)).toBe("number");
});

/**
 * Currently chained to `ts-node:es2019` option which does not support `bigint`. Setting
 * `ts-node:es2020` adds `bigint`  but removes nullish coalescing and optional chaining.
 */
// test('Identifies bigint', () => {
//   expect(getTypeOf(1n)).toBe('bigint');
// });

test("Identifies string", () => {
  expect(getTypeOf("some string")).toBe("string");
});

test("Identifies symbol", () => {
  expect(getTypeOf(Symbol(12))).toBe("symbol");
});

test("Identifies array", () => {
  expect(getTypeOf([])).toBe("array");
});

test("Identifies object", () => {
  expect(getTypeOf({})).toBe("object");
});
