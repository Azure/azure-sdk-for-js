// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createFetchHttpClient } from "./fetchHttpClient";
import { HttpClient } from "./interfaces";

/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient(): HttpClient {
  return createFetchHttpClient();
}
