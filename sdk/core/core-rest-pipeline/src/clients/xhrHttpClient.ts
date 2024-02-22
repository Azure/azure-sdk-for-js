// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { HttpClient } from "../interfaces.js";

/**
 * Create a new HttpClient instance based on XmlHTTPRequest for the browser environment.
 */
export function createXhrHttpClient(): HttpClient {
  throw new Error("XhrHttpClient is not supported in non-browser environment");
}
