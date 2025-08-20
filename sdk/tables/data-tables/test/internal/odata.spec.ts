// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { odata } from "@azure/data-tables";
import { describe, it, assert } from "vitest";

describe("odata", () => {
  it("should handle empty string", () => {
    const testString = odata``;
    assert.equal(testString, "");
  });

  it("should handle string without variables", () => {
    const testString = odata`Foo`;
    assert.equal(testString, "Foo");
  });

  it("should not quote number", () => {
    const testValue = 4;
    const testString = odata`test number ${testValue}`;
    assert.equal(testString, "test number 4");
  });

  it("should not quote boolean", () => {
    const testValue = true;
    const testString = odata`test boolean ${testValue}`;
    assert.equal(testString, "test boolean true");
  });

  it("should quote string", () => {
    const testValue = "FooBar";
    const testString = odata`test string ${testValue}`;
    assert.equal(testString, "test string 'FooBar'");
  });

  it("should escape string with quotes", () => {
    const testValue = '"FooBar"';
    const testString = odata`test string ${testValue}`;
    assert.equal(testString, "test string '\"FooBar\"'");
  });

  it("should not escape property names unnecessarily", () => {
    const testDate = new Date(1);
    const testString = odata`test lt ${testDate}`;
    assert.equal(testString, `test lt datetime'${testDate.toISOString()}'`);
  });
});
