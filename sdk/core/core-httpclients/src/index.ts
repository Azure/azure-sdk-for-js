// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * Create a new HttpClient instance based on XmlHTTPRequest for the browser environment.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createXhrHttpClient() {
  // this is added to make api-extractor happy
  throw new Error("XhrHttpClient is not supported in non-browser environment");
}
