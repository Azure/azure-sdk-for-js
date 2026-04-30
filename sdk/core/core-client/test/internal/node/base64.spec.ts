// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { encodeByteArray } from "../../../src/base64.js";

describe("base64 (Node)", () => {
  it("should handle Buffer input directly in encodeByteArray", () => {
    const buf = Buffer.from("hello world");
    const result = encodeByteArray(buf);
    assert.strictEqual(result, buf.toString("base64"));
  });
});
