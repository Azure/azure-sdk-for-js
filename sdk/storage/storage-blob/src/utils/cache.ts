// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createDefaultHttpClient, HttpClient } from "@azure/core-rest-pipeline";

let _defaultHttpClient = createDefaultHttpClient();

export function getCachedDefaultHttpClient(): HttpClient {
  return _defaultHttpClient;
}

/**
 * @internal
 */
export function _testOnlySetCachedDefaultHttpClient(client: HttpClient): void {
  _defaultHttpClient = client;
}
