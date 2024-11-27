// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert } from "chai";
import { odata } from "../../src";

describe("odata", function () {
  it("should handle empty string", function () {
    const testString = odata``;
    assert.equal(testString, "");
  });

  it("should handle string without variables", function () {
    const testString = odata`Foo`;
    assert.equal(testString, "Foo");
  });

  it("should not quote number", function () {
    const testValue = 4;
    const testString = odata`test number ${testValue}`;
    assert.equal(testString, "test number 4");
  });

  it("should not quote boolean", function () {
    const testValue = true;
    const testString = odata`test boolean ${testValue}`;
    assert.equal(testString, "test boolean true");
  });

  it("should quote string", function () {
    const testValue = "FooBar";
    const testString = odata`test string ${testValue}`;
    assert.equal(testString, "test string 'FooBar'");
  });

  it("should escape string with quotes", function () {
    const testValue = '"FooBar"';
    const testString = odata`test string ${testValue}`;
    assert.equal(testString, "test string '\"FooBar\"'");
  });

  it("should not escape property names unnecessarily", function () {
    const testDate = new Date(1);
    const testString = odata`test lt ${testDate}`;
    assert.equal(testString, `test lt datetime'${testDate.toISOString()}'`);
  });
});
