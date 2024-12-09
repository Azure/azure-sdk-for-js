// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { decode, encode } from "../../src/base64.js";
import { describe, it, assert } from "vitest";

describe("base64", function () {
  it("strings can roundtrip", function () {
    const message = "Only *you* can prevent null dereferences!";
    const encoded = encode(message);
    const decoded = decode(encoded);
    assert.strictEqual(decoded, message);
  });
});
