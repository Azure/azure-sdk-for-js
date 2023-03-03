// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createDefaultHttpClient, HttpClient } from "@azure/core-rest-pipeline";

const _defaultHttpClient = createDefaultHttpClient();

export function getCachedDefaultHttpClient(): HttpClient {
  return _defaultHttpClient;
}
