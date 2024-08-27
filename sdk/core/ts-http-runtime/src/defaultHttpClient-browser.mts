// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient } from "./interfaces.js";
import { createFetchHttpClient } from "./fetchHttpClient.js";

/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient(): HttpClient {
  return createFetchHttpClient();
}
