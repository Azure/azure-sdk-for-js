// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "@azure/core-rest-pipeline";

/**
 * Create a new HttpClient instance based on XmlHTTPRequest for the browser environment.
 */
export function createXhrHttpClient(): HttpClient {
  // this is added to make api-extractor happy
  throw new Error("XhrHttpClient is not supported in non-browser environment");
}
