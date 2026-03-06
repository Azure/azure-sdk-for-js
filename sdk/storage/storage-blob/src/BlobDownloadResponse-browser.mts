// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// BlobDownloadResponse is only available in Node.js runtime.
// This polyfill provides a type-compatible stub for browser builds.
export class BlobDownloadResponse {
  _response: any;

  constructor(..._args: any[]) {
    throw new Error("BlobDownloadResponse is not supported in the browser.");
  }
}
