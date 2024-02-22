// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { HttpClient } from "../interfaces.js";

/**
 * Create a new HttpClient instance for the NodeJS environment.
 */
export function createNodeHttpClient(): HttpClient {
  throw new Error("NodeHttpClient is not supported in non-Node.js environment");
}
