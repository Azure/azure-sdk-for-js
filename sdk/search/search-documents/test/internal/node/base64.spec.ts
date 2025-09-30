// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { decode, encode } from "@azure/search-documents";
import { describe, it, assert } from "vitest";

describe("base64", () => {
  it("strings can roundtrip", () => {
    const message = "Only *you* can prevent null dereferences!";
    const encoded = encode(message);
    const decoded = decode(encoded);
    assert.strictEqual(decoded, message);
  });
});
