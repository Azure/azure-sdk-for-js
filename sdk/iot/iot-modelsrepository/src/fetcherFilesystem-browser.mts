// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationOptions } from "@azure/core-client";
import type { Fetcher } from "./fetcherAbstract.js";
import type { DTDL } from "./psuedoDtdl.js";

export class FilesystemFetcher implements Fetcher {
  constructor(_baseFilePath: string) {
    throw new Error("FilesystemFetcher is not supported in the browser.");
  }

  async fetch(_path: string, _options?: OperationOptions): Promise<DTDL | DTDL[]> {
    throw new Error("FilesystemFetcher is not supported in the browser.");
  }
}
