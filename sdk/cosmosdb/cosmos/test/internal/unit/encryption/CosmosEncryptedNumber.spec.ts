// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import assert from "assert";
import { CosmosEncryptedNumber } from "../../../../src";

describe("CosmosEncryptedNumber", function () {
  it("should throw an error on passing invalid number", function () {
    assert.throws(() => {
      new CosmosEncryptedNumber("abc");
    }, /Invalid number passed to CosmosEncryptedNumber/);
  });

  it("should work on passing a valid number", function () {
    const encryptedNumber = new CosmosEncryptedNumber("4");
    assert.equal(encryptedNumber.value, "4");

    const encryptedNumber2 = new CosmosEncryptedNumber("4.1");
    assert.equal(encryptedNumber2.value, "4.1");

    const encryptedNumber3 = new CosmosEncryptedNumber("4.0");
    assert.equal(encryptedNumber3.value, "4.0");
  });
});
