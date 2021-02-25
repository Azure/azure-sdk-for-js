// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpsClient, createDefaultHttpsClient } from "@azure/core-https";

let cachedHttpsClient: HttpsClient | undefined;

export function getCachedDefaultHttpsClient(): HttpsClient {
  if (!cachedHttpsClient) {
    cachedHttpsClient = createDefaultHttpsClient();
  }

  return cachedHttpsClient;
}
