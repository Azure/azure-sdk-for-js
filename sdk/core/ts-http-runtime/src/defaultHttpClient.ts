// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HttpClient } from "#platform/interfaces";
import { createNodeHttpClient } from "#platform/nodeHttpClient";

/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient(): HttpClient {
  return createNodeHttpClient();
}
