// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createDefaultHttpClient, HttpClient } from "@azure/core-rest-pipeline";

let _defaultHttpClient: HttpClient;

export function getCachedDefaultHttpClient(): HttpClient {
  if (!_defaultHttpClient) {
    _defaultHttpClient = createDefaultHttpClient();
  }
  return _defaultHttpClient;
}
