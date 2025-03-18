// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { CosmosEncryptedNumber } from "../../../../src";

describe("CosmosEncryptedNumber", function () {
  it("should throw an error when input is an empty string", function () {
    assert.throws(() => {
      new CosmosEncryptedNumber("   ");
    }, /Input cannot be an empty string/);
  });

  it("should throw an error when input is not a valid number", function () {
    assert.throws(() => {
      new CosmosEncryptedNumber("abc");
    }, /is not a valid number/);
  });

  it("should throw an error when input is a non-finite number (Infinity or -Infinity)", function () {
    assert.throws(() => {
      new CosmosEncryptedNumber("Infinity");
    }, /must be finite/);
    assert.throws(() => {
      new CosmosEncryptedNumber("-Infinity");
    }, /must be finite/);
  });

  it("should throw an error when exponential notation is used", function () {
    assert.throws(() => {
      new CosmosEncryptedNumber("1e3");
    }, /Exponential notation is not allowed/);
    assert.throws(() => {
      new CosmosEncryptedNumber("1E3");
    }, /Exponential notation is not allowed/);
  });

  it("should create an instance when a valid whole number string is provided", function () {
    const encryptedNumber = new CosmosEncryptedNumber("4");
    assert.strictEqual(encryptedNumber.value, "4");
  });

  it("should create an instance when a valid decimal number string is provided", function () {
    const encryptedNumber = new CosmosEncryptedNumber("4.1");
    assert.strictEqual(encryptedNumber.value, "4.1");
  });

  it("should create an instance when a valid decimal number string with trailing zero is provided", function () {
    const encryptedNumber = new CosmosEncryptedNumber("4.0");
    assert.strictEqual(encryptedNumber.value, "4.0");
  });
});
