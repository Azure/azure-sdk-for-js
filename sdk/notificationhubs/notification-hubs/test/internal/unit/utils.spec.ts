// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import {
  getDate,
  getDateOrUndefined,
  getFloat,
  getFloatOrUndefined,
  getInteger,
  getIntegerOrUndefined,
  getString,
  getStringOrUndefined,
  getTagsOrUndefined,
  isDefined,
} from "../../../src/utils/utils.js";

describe("utils", () => {
  describe("isDefined", () => {
    it("should return false for an undefined value", () => {
      let value: string | undefined;
      const actual = isDefined(value);
      assert.isFalse(actual);
    });

    it("should return true for a value that isn't undefined", () => {
      const value = "42";
      const actual = isDefined(value);
      assert.isTrue(actual);
    });
  });

  describe("getString", () => {
    it("should get a string with a defined string", () => {
      const value = "42";
      const actual = getString(value, "value");
      assert.equal(actual, value);
    });

    it("should get a string with a defined number", () => {
      const value = 42;
      const actual = getString(value, "value");
      assert.equal(actual, value.toString());
    });

    it("should throw on an undefined value", () => {
      let value: string | undefined;
      assert.throws(() => {
        getString(value, "value");
      });
    });
  });

  describe("getStringOrUndefined", () => {
    it("should get a string with a defined string", () => {
      const value = "42";
      const actual = getStringOrUndefined(value);
      assert.equal(actual, value);
    });

    it("should get a string with a defined number", () => {
      const value = 42;
      const actual = getStringOrUndefined(value);
      assert.equal(actual, value.toString());
    });

    it("should return undefined with an undefined value", () => {
      let value: string | undefined;
      const actual = getStringOrUndefined(value);
      assert.isUndefined(actual);
    });
  });

  describe("getInteger", () => {
    it("should return a number from a number input", () => {
      const value = 42;
      const actual = getInteger(value, "value");
      assert.equal(actual, value);
    });

    it("should return a number from a string number input", () => {
      const value = "42";
      const actual = getInteger(value, "value");
      assert.equal(actual, 42);
    });

    it("should throw with a non-number input", () => {
      const value = "foobarbaz";
      assert.throws(() => {
        getInteger(value, "value");
      });
    });

    it("should throw with undefined input", () => {
      let value: string | undefined;
      assert.throws(() => {
        getInteger(value, "value");
      });
    });
  });

  describe("getIntegerOrUndefined", () => {
    it("should return a number from a number input", () => {
      const value = 42;
      const actual = getIntegerOrUndefined(value);
      assert.equal(actual, value);
    });

    it("should return a number from a string number input", () => {
      const value = "42";
      const actual = getIntegerOrUndefined(value);
      assert.equal(actual, 42);
    });

    it("should return undefined with a non-number input", () => {
      const value = "foobarbaz";
      const actual = getIntegerOrUndefined(value);
      assert.isUndefined(actual);
    });

    it("should return undefined with undefined input", () => {
      let value: string | undefined;
      const actual = getIntegerOrUndefined(value);
      assert.isUndefined(actual);
    });
  });

  describe("getFloat", () => {
    it("should return a number from a number input", () => {
      const value = 42.2;
      const actual = getFloat(value, "value");
      assert.equal(actual, value);
    });

    it("should return a number from a string number input", () => {
      const value = "42.2";
      const actual = getFloat(value, "value");
      assert.equal(actual, 42.2);
    });

    it("should throw with a non-number input", () => {
      const value = "foobarbaz";
      assert.throws(() => {
        getFloat(value, "value");
      });
    });

    it("should throw with undefined input", () => {
      let value: string | undefined;
      assert.throws(() => {
        getFloat(value, "value");
      });
    });
  });

  describe("getFloatOrUndefined", () => {
    it("should return a number from a number input", () => {
      const value = 42.2;
      const actual = getFloatOrUndefined(value);
      assert.equal(actual, value);
    });

    it("should return a number from a string number input", () => {
      const value = "42.2";
      const actual = getFloatOrUndefined(value);
      assert.equal(actual, 42.2);
    });

    it("should return undefined with a non-number input", () => {
      const value = "foobarbaz";
      const actual = getFloatOrUndefined(value);
      assert.isUndefined(actual);
    });

    it("should return undefined with undefined input", () => {
      let value: string | undefined;
      const actual = getFloatOrUndefined(value);
      assert.isUndefined(actual);
    });
  });

  describe("getDate", () => {
    it("should return a date from a valid string", () => {
      const value = "2019-01-10T10:00:00";
      const actual = getDate(value, "value");
      assert.equal(+actual!, +new Date(value));
    });

    it("should throw from an invalid string", () => {
      const value = "foo";
      assert.throws(() => {
        getDate(value, "value");
      });
    });
  });

  describe("getDateOrUndefined", () => {
    it("should return a date from a valid string", () => {
      const value = "2019-01-10T10:00:00";
      const actual = getDateOrUndefined(value);
      assert.equal(+actual!, +new Date(value));
    });

    it("should return undefined from an invalid string", () => {
      const value = "foo";
      const actual = getDateOrUndefined(value);
      assert.isUndefined(actual);
    });
  });

  describe("getTagsOrUndefined", () => {
    it("should return multiple tags for a comma separated list", () => {
      const value = "tag1,tag2,tag3";
      const actual = getTagsOrUndefined(value);
      assert.deepEqual(actual, ["tag1", "tag2", "tag3"]);
    });

    it("should return a single item array for just one tag", () => {
      const value = "tag1";
      const actual = getTagsOrUndefined(value);
      assert.deepEqual(actual, ["tag1"]);
    });

    it("should return undefined for no tags", () => {
      let value: string | undefined;
      const actual = getTagsOrUndefined(value);
      assert.isUndefined(actual);
    });
  });
});
