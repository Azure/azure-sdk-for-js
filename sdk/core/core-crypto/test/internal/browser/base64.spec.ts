// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { base64ToBytes, bufferToBase64 } from "../../../src/utils/base64.browser";
import { assert } from "chai";

describe("Base64", function() {
  describe("base64ToBytes", function() {
    it("converts a base64 string to bytes", function() {
      const input = "YXp1cmU="; // 'azure' in utf8.

      const output = base64ToBytes(input);
      assert.deepEqual(
        output,
        new Uint8Array([97, 122, 117, 114, 101]),
        "Incorrect conversion of base64 to bytes."
      );
    });
  });

  describe("bufferToBase64", function() {
    it("converts an ArrayBuffer to a base64 string", function() {
      const input = new Uint8Array([97, 122, 117, 114, 101]).buffer; // 'azure' in utf8.

      const output = bufferToBase64(input);
      assert.deepEqual(output, "YXp1cmU=", "Incorrect conversion of bytes to base64.");
    });

    it("has proper padding", function() {
      const scenarios = [
        { bytes: new Uint8Array([65]), expected: "QQ==" },
        { bytes: new Uint8Array([65, 90]), expected: "QVo=" },
        { bytes: new Uint8Array([65, 66, 67]), expected: "QUJD" }
      ];

      for (const scenario of scenarios) {
        const output = bufferToBase64(scenario.bytes.buffer);
        assert.equal(output, scenario.expected, "Incorrect conversion of bytes to base64.");
      }
    });
  });
});
