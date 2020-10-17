// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestPrepareOptions } from "@azure/core-http";

export interface MSIOptions {
  resource?: string;
  clientId?: string;
}

export type MSIExpiresInParser = ((requestBody: any) => number) | undefined;

export interface MSI {
  isAvailable(options?: MSIOptions): boolean;
  prepareRequestOptions(options: MSIOptions): RequestPrepareOptions;
  getExpiresInParser(): MSIExpiresInParser;
}
