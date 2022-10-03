// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { bufferToHex } from "../../src/hex";

function generateValidBytes(): Uint8Array {
  const bytes = new Uint8Array(256);
  return bytes.map((_, index) => index);
}

describe("Hex", function () {
  describe("bufferToHex", function () {
    it("encodes a byte", function () {
      const bytes = generateValidBytes();
      bytes.forEach((_, index) => {
        const hex = bufferToHex(bytes.buffer.slice(index, index + 1));
        assert.equal(hex.length, 2, "Unexpected length for hex value.");
        assert.equal(parseInt(hex, 16), index, "Unexpected hex value.");
      });
    });

    it("encodes bytes", function () {
      const bytes = new Uint8Array([97, 122, 117, 114, 101]); // 'azure' in utf8
      const hex = bufferToHex(bytes.buffer);
      assert.equal(hex, "617a757265", "Unexpected hex value.");
    });
  });
});
