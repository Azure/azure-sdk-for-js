// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { binaryArrayToString, stringToBinaryArray } from "../src/helpers/getBinaryBody";

describe("getBinaryBody", () => {
  describe("decodeBinaryContent", () => {
    it("should handle uint8array content", () => {
      const decoded = binaryArrayToString(new Uint8Array([0x66, 0x6f, 0x6f]));
      assert.equal(decoded, "foo");
    });
  });

  describe("encodeBinaryContent", () => {
    it("should handle encode a string to uint8array", () => {
      const decoded = stringToBinaryArray("foo");
      assert.deepEqual(decoded, new Uint8Array([0x66, 0x6f, 0x6f]));
    });
  });
});
