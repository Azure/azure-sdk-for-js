// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, expect } from "vitest";
import { reshape } from "../../src/reshape";

describe("reshape", function () {
  it("renames a simple property", function () {
    const input = { a: 1, b: 2 };
    const actual = reshape(input, "a", "c");
    const expected = { c: 1, b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("can remap the root object", function () {
    const actual = reshape({ properties: { a: 1, b: 2 } }, "", (input: any) => input.properties);
    const expected = { a: 1, b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("maps a simple property", function () {
    const input = { a: 1, b: 2 };
    const actual = reshape(input, "a", String);
    const expected = { a: "1", b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("renames and maps a simple property", function () {
    const input = { a: 1, b: 2 };
    const actual = reshape(input, "a", "c", String);
    const expected = { c: "1", b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("renames a nested property", function () {
    const input = { a: { c: { e: 4 }, d: 3 }, b: 2 };
    const actual = reshape(input, "a.c.e", "f");
    const expected = { a: { c: { f: 4 }, d: 3 }, b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("can map elements of an array", function () {
    const input = { a: { b: [1, 2, 3] } };
    const actual = reshape(input, "a.b[]", String);
    const expected = { a: { b: ["1", "2", "3"] } };
    assert.deepEqual(actual, expected);
  });

  it("renaming array elements is an error", function () {
    const input = { a: { b: [1, 2, 3] } };
    expect(() => reshape(input, "a.b[]", "oops")).toThrowError("cannot rename array indices");
  });

  it("can rename properties of elements of an array", function () {
    const input = {
      a: {
        b: [
          { c: 1, d: 2 },
          { c: 3, d: 4 },
        ],
      },
    };
    const actual = reshape(input, "a.b[]c", "e");
    const expected = {
      a: {
        b: [
          { e: 1, d: 2 },
          { e: 3, d: 4 },
        ],
      },
    };
    assert.deepEqual(actual, expected);
  });

  it("selecting a property that doesn't exist does nothing", function () {
    const input = { a: 1, b: 2 };
    const actual = reshape(input, "c", "d");
    const expected = { a: 1, b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("selecting a property as an array that is not an array does nothing", function () {
    const input = { a: 1, b: 2 };
    const actual = reshape(input, "a[]", String);
    const expected = { a: 1, b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("property with a dot in the name can be selected", function () {
    const input = { a: { ".c.": { e: 4 }, d: 3 }, b: 2 };
    const actual = reshape(input, String.raw`a.\.c\..e`, "f");
    const expected = { a: { ".c.": { f: 4 }, d: 3 }, b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("property with a backslash in the name can be selected", function () {
    const input = { a: { "\\c\\": { e: 4 }, d: 3 }, b: 2 };
    const actual = reshape(input, String.raw`a.\\c\\.e`, "f");
    const expected = { a: { "\\c\\": { f: 4 }, d: 3 }, b: 2 };
    assert.deepEqual(actual, expected);
  });

  it("can handle nested arrays", function () {
    const input = {
      a: [
        [1, 2],
        [3, 4],
      ],
    };
    const actual = reshape(input, "a[][]", String);
    const expected = {
      a: [
        ["1", "2"],
        ["3", "4"],
      ],
    };
    assert.deepEqual(actual, expected);
  });
});
