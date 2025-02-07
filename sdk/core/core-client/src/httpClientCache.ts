// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient } from "@azure/core-rest-pipeline";
import { createDefaultHttpClient } from "@azure/core-rest-pipeline";

let cachedHttpClient: HttpClient | undefined;

export function getCachedDefaultHttpClient(): HttpClient {
  if (!cachedHttpClient) {
    cachedHttpClient = createDefaultHttpClient();
  }

  return cachedHttpClient;
}
