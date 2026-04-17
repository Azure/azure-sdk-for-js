// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { operationOptionsToRequestParameters } from "../../src/operationOptionHelpers.js";

describe("operationOptionsToRequestParameters", () => {
  it("promotes requestOptions fields to root-level request parameters", () => {
    const onUpload = () => {};
    const onDownload = () => {};
    const result = operationOptionsToRequestParameters({
      requestOptions: {
        allowInsecureConnection: true,
        timeout: 5000,
        skipUrlEncoding: true,
        onUploadProgress: onUpload,
        onDownloadProgress: onDownload,
        headers: { "x-custom": "value" },
      },
    });
    assert.equal(result.allowInsecureConnection, true);
    assert.equal(result.timeout, 5000);
    assert.equal(result.skipUrlEncoding, true);
    assert.equal(result.onUploadProgress, onUpload);
    assert.equal(result.onDownloadProgress, onDownload);
    assert.deepEqual(result.headers, { "x-custom": "value" });
  });

  it("passes through abortSignal and onResponse", () => {
    const abortController = new AbortController();
    const onResponse = () => {};
    const result = operationOptionsToRequestParameters({
      abortSignal: abortController.signal,
      onResponse,
    });
    assert.equal(result.abortSignal, abortController.signal);
    assert.equal(result.onResponse, onResponse);
  });
});
