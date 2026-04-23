// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// FileDownloadResponse is only available in Node.js runtime.
export class FileDownloadResponse {
  _response: any;

  constructor(..._args: any[]) {
    throw new Error("FileDownloadResponse is not supported in the browser.");
  }
}
