// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isDefined, isObjectWithProperties, objectHasProperty } from "../../src/index";
import { assert } from "chai";

describe("Type guards", function () {
  describe("isDefined", function () {
    it("should return false when the argument is undefined", async function () {
      assert.isFalse(isDefined(undefined));
    });
    it("should return false when the argument is null", async function () {
      assert.isFalse(isDefined(null));
    });
    it("should return true for other primitive types", async function () {
      assert.isTrue(isDefined(true));
      assert.isTrue(isDefined(1));
      assert.isTrue(isDefined(BigInt(1)));
      assert.isTrue(isDefined(NaN));
      assert.isTrue(isDefined("azure"));
      assert.isTrue(isDefined(Symbol("azure")));
      assert.isTrue(isDefined({ defined: true }));
    });
  });
  describe("isObjectWithProperties", function () {
    it("should return true when the object contains the listed properties", async function () {
      assert.isTrue(isObjectWithProperties({ a: 1, b: 2, c: 3 }, ["a"]));
      assert.isTrue(
        isObjectWithProperties({ a: 1, b: 2, c: 3 }, ["a", "b"]),
        "object contains properties `a` and `b`"
      );
    });
    it("should return false when the object does not contain at least one listed property", async function () {
      assert.isFalse(isObjectWithProperties({ a: 1, b: 2, c: 3 }, ["d"]));
      assert.isFalse(
        isObjectWithProperties({ a: 1, b: 2, c: 3 }, ["a", "d"]),
        "object does not contain property `d`"
      );
    });
  });
  describe("objectHasProperty", function () {
    it("should return true when the argument is an object containing the property name", async function () {
      assert.isTrue(objectHasProperty({ a: 1, b: 2, c: 3 }, "a"));
    });
    it("should return false when the object does not contain the given property", async function () {
      assert.isFalse(objectHasProperty({ a: 1, b: 2, c: 3 }, "d"));
    });
    it("should return false when the argument is not an object", async function () {
      assert.isFalse(objectHasProperty(undefined, "azure"));
      assert.isFalse(objectHasProperty(null, "azure"));
      assert.isFalse(objectHasProperty(true, "azure"));
      assert.isFalse(objectHasProperty(1, "azure"));
      assert.isFalse(objectHasProperty(BigInt(1), "azure"));
      assert.isFalse(objectHasProperty(NaN, "azure"));
      assert.isFalse(objectHasProperty("azure", "azure"));
      assert.isFalse(objectHasProperty(Symbol("azure"), "azure"));
    });
  });
});
