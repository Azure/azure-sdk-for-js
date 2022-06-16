// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { 
  getDate,
  getDateOrUndefined,
  getFloat,
  getFloatOrUndefined,
  getInteger,
  getIntegerOrUndefined,
  getString, 
  getStringOrUndefined, 
  isDefined, 
} from "../../../src/utils/xmlUtils";

describe("xmlUtils", () => {
  describe("isDefined", () => {
    it("should return false for an undefined value", () => {
      let value: string | undefined;
      const actual = isDefined(value);
      assert.isFalse(actual);
    });

    it("should return true for a value that isn't undefined", () => {
      let value = "42";
      const actual = isDefined(value);
      assert.isTrue(actual);
    })
  });

  describe("getString", () => {
    it("should get a string with a defined string", () => {
      let value = "42";
      const actual = getString(value, "value");
      assert.equal(actual, value);
    });

    it("should get a string with a defined number", () => {
      let value = 42;
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
      let value = "42";
      const actual = getStringOrUndefined(value);
      assert.equal(actual, value);
    });

    it("should get a string with a defined number", () => {
      let value = 42;
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
      let value = 42;
      const actual = getInteger(value, "value");
      assert.equal(actual, value);
    });

    it("should return a number from a string number input", () => {
      let value = "42";
      const actual = getInteger(value, "value");
      assert.equal(actual, 42);
    });

    it("should throw with a non-number input", () => {
      let value = "foobarbaz";
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
      let value = 42;
      const actual = getIntegerOrUndefined(value);
      assert.equal(actual, value);
    });

    it("should return a number from a string number input", () => {
      let value = "42";
      const actual = getIntegerOrUndefined(value);
      assert.equal(actual, 42);
    });

    it("should return undefined with a non-number input", () => {
      let value = "foobarbaz";
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
      let value = 42.2;
      const actual = getFloat(value, "value");
      assert.equal(actual, value);
    });

    it("should return a number from a string number input", () => {
      let value = "42.2";
      const actual = getFloat(value, "value");
      assert.equal(actual, 42.2);
    });

    it("should throw with a non-number input", () => {
      let value = "foobarbaz";
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

  });

});
