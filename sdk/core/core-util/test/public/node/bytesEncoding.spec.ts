// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isBrowser, isNode } from "../../../src";
import { stringToUint8Array, uint8ArrayToString } from "../../../src/bytesEncoding";
import { assert } from "chai";

describe("Base64", function () {
  describe("isBrowser (node)", function () {
    it("should return false", async function () {
      assert.isFalse(isBrowser);
    });
  });
  describe("isNode (node)", function () {
    it("should return true", async function () {
      assert.isTrue(isNode);
    });
  });

  describe("base64ToBytes", function () {
    it("converts a base64 string to bytes", function () {
      const input = "YXp1cmU="; // 'azure' in base64.

      const output = stringToUint8Array(input, "base64");
      assert.deepEqual(
        output,
        new Uint8Array([97, 122, 117, 114, 101]),
        "Incorrect conversion of base64 to bytes."
      );
    });

    it("converts a utf-8 string to bytes", function () {
      const input = "\x61\x7A\x75\x72\x65"; // 'azure' in utf8.

      const output = stringToUint8Array(input, "utf-8");
      assert.deepEqual(
        output,
        new Uint8Array([97, 122, 117, 114, 101]),
        "Incorrect conversion of utf-8 to bytes."
      );
    });

    it("converts a base64url string to bytes", function () {
      const input = "YXp1cmU"; // 'azure' in base64url.

      const output = stringToUint8Array(input, "base64url");
      assert.deepEqual(
        output,
        new Uint8Array([97, 122, 117, 114, 101]),
        "Incorrect conversion of utf-8 to bytes."
      );
    });
  });

  describe("bufferToBase64", function () {
    it("converts an uint8array to a base64 string", function () {
      const input = new Uint8Array([97, 122, 117, 114, 101]); // 'azure' in base64.

      const output = uint8ArrayToString(input, "base64");
      assert.deepEqual(output, "YXp1cmU=", "Incorrect conversion of bytes to base64.");
    });

    it("converts an uint8array to a utf-8 string", function () {
      const input = new Uint8Array([97, 122, 117, 114, 101]); // 'azure' in utf8.

      const output = uint8ArrayToString(input, "utf-8");
      assert.deepEqual(output, "\x61\x7A\x75\x72\x65", "Incorrect conversion of bytes to utf-8.");
    });

    it("converts an uint8array to a base64url string", function () {
      const input = new Uint8Array([97, 122, 117, 114, 101]); // 'azure' in base64.

      const output = uint8ArrayToString(input, "base64url");
      assert.deepEqual(output, "YXp1cmU", "Incorrect conversion of bytes to base64.");
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

    it("has proper padding", function () {
      const scenarios = [
        { bytes: new Uint8Array([65]), expected: "A" },
        { bytes: new Uint8Array([65, 90]), expected: "AZ" },
        { bytes: new Uint8Array([65, 66, 67]), expected: "ABC" },
      ];

      for (const scenario of scenarios) {
        const output = uint8ArrayToString(scenario.bytes, "utf-8");
        assert.equal(output, scenario.expected, "Incorrect conversion of bytes to utf-8.");
      }
    });

    it("has proper padding", function () {
      const scenarios = [
        { bytes: new Uint8Array([65]), expected: "QQ" },
        { bytes: new Uint8Array([65, 90]), expected: "QVo" },
        { bytes: new Uint8Array([65, 66, 67]), expected: "QUJD" },
      ];

      for (const scenario of scenarios) {
        const output = uint8ArrayToString(scenario.bytes, "base64url");
        assert.equal(output, scenario.expected, "Incorrect conversion of bytes to base64.");
      }
    });
  });
});
