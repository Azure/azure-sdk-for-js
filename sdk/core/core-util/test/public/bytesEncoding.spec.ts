// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { stringToUint8Array, uint8ArrayToString } from "../../src/bytesEncoding";
import { assert } from "chai";

describe("bytesEncoding", function () {
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

    it("converts base64-encoded data containing an emoji (multibyte character) to bytes", function () {
      const input = "8J+RjQ=="; // thumbs up emoji, hex f0 9f 91 8d
      const output = stringToUint8Array(input, "base64");
      assert.deepEqual(output, new Uint8Array([0xf0, 0x9f, 0x91, 0x8d]));
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

  describe("bytes to hex", function () {
    it("encodes a byte", function () {
      const bytes = new Uint8Array(256).map((_, index) => index);
      bytes.forEach((_, index) => {
        const hex = uint8ArrayToString(bytes.slice(index, index + 1), "hex");
        assert.equal(hex.length, 2, "Unexpected length for hex value.");
        assert.equal(parseInt(hex, 16), index, "Unexpected hex value.");
      });
    });

    it("encodes bytes", function () {
      const bytes = new Uint8Array([97, 122, 117, 114, 101]); // 'azure' in utf8
      const hex = uint8ArrayToString(bytes, "hex");
      assert.equal(hex, "617a757265", "Unexpected hex value.");
    });
  });

  describe("hex to bytes", function () {
    it("decodes bytes", function () {
      const hex = "617a757265";
      const bytes = stringToUint8Array(hex, "hex");

      assert.sameOrderedMembers([...bytes], [0x61, 0x7a, 0x75, 0x72, 0x65]);
    });

    it("truncates with odd number of characters", function () {
      const invalid = "abc";
      const bytes = stringToUint8Array(invalid, "hex");

      assert.sameOrderedMembers([...bytes], [0xab]);
    });

    it("truncates upon encountering invalid hex digits", function () {
      const invalid = "0102xx03";
      const bytes = stringToUint8Array(invalid, "hex");

      assert.sameOrderedMembers([...bytes], [0x01, 0x02]);
    });
  });
});
