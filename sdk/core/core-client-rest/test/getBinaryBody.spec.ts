// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert } from "vitest";
import { binaryArrayToString } from "../src/helpers/getBinaryBody.js";

describe("getBinaryBody", () => {
  describe("decodeBinaryContent", () => {
    it("should handle uint8array content", () => {
      const decoded = binaryArrayToString(new Uint8Array([0x66, 0x6f, 0x6f]));
      assert.equal(decoded, "foo");
    });
  });
});
