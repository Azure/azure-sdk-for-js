// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { getRequestBody } from "../../../src/client/sendRequest.js";

describe("getRequestBody (browser)", () => {
  it("should handle FormData", () => {
    const formData = new FormData();
    formData.append("foo", "bar");
    const result = getRequestBody(formData);
    assert.strictEqual(result.body, formData);
  });

  it("should handle Blob", () => {
    const blob = new Blob(["test content"], { type: "text/plain" });
    const result = getRequestBody(blob);
    assert.strictEqual(result.body, blob);
  });

  it("should handle Uint8Array", () => {
    const array = new Uint8Array([1, 2, 3]);
    const result = getRequestBody(array);
    assert.strictEqual(result.body, array);
  });

  it("should handle ReadableStream", () => {
    const stream = new ReadableStream();
    const result = getRequestBody(stream);
    assert.strictEqual(result.body, stream);
  });
});
