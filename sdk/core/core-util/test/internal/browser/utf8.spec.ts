// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { utf8ToBytes } from "../../../src/utf8.browser";

describe("utf-8", function () {
  describe("utf8ToBytes", function () {
    it("converts a utf-8 string to bytes", function () {
      const input = "azure"; // 'azure' in utf8.

      const output = utf8ToBytes(input);
      assert.deepEqual(
        output,
        new Uint8Array([97, 122, 117, 114, 101]),
        "Incorrect conversion of utf-8 to bytes."
      );
    });
  });
});
