// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isBrowser, isNode } from "../../../src";
import { stringToUint8Array, uint8ArrayToString } from "../../../src/bytesEncoding";
import { assert } from "chai";

describe("Base64", function () {
  describe("isBrowser (node)", function () {
    it("should return true", async function () {
      assert.isTrue(isBrowser);
    });
  });
  describe("isNode (node)", function () {
    it("should return false", async function () {
      assert.isTrue(isNode);
    });
  });
  describe("base64ToBytes", function () {
    it("converts a base64 string to bytes", function () {
      const input = "YXp1cmU="; // 'azure' in utf8.

      const output = stringToUint8Array(input, "base64");
      assert.deepEqual(
        output,
        new Uint8Array([97, 122, 117, 114, 101]),
        "Incorrect conversion of base64 to bytes."
      );
    });
  });

  describe("bufferToBase64", function () {
    it("converts an ArrayBuffer to a base64 string", function () {
      const input = new Uint8Array([97, 122, 117, 114, 101]); // 'azure' in utf8.

      const output = uint8ArrayToString(input, "base64");
      assert.deepEqual(output, "YXp1cmU=", "Incorrect conversion of bytes to base64.");
    });

    it("has proper padding", function () {
      const scenarios = [
        { bytes: new Uint8Array([65]), expected: "QQ==" },
        { bytes: new Uint8Array([65, 90]), expected: "QVo=" },
        { bytes: new Uint8Array([65, 66, 67]), expected: "QUJD" },
      ];

      for (const scenario of scenarios) {
        const output = uint8ArrayToString(scenario.bytes, "base64");
        assert.equal(output, scenario.expected, "Incorrect conversion of bytes to base64.");
      }
    });
  });
});
