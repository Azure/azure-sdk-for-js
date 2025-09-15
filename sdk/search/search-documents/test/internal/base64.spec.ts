// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, it } from "vitest";
import { decode, encode } from "../../src/base64.js";

describe("base64", () => {
  it("strings can roundtrip", () => {
    const message = "Only *you* can prevent null dereferences!";
    const encoded = encode(message);
    const decoded = decode(encoded);
    assert.strictEqual(decoded, message);
  });
});
