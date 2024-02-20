// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Create a new HttpClient instance based on XmlHTTPRequest for the browser environment.
 */
export function createXhrHttpClient(): never {
  // this is added to make api-extractor happy
  throw new Error("XhrHttpClient is not supported in non-browser environment");
}
