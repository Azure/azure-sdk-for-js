// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { encodeByteArray } from "../../src/base64.js";

describe("base64", () => {
  it("should handle Buffer input directly in encodeByteArray", () => {
    const buf = Buffer.from("hello world");
    const result = encodeByteArray(buf);
    assert.strictEqual(result, buf.toString("base64"));
  });

  it("should handle Uint8Array input in encodeByteArray", () => {
    const arr = new Uint8Array([72, 101, 108, 108, 111]);
    const result = encodeByteArray(arr);
    assert.strictEqual(result, Buffer.from(arr).toString("base64"));
  });
});
