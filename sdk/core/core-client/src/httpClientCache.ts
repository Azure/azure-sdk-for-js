// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, createDefaultHttpClient } from "@azure/core-rest-pipeline";

let cachedHttpClient: HttpClient | undefined;

export function getCachedDefaultHttpClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = createDefaultHttpClient();
  }

  return cachedHttpClient;
}
