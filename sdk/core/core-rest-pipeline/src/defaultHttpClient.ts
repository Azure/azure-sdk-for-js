// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import type { CreateHttpClientOptions, HttpClient } from "./interfaces";
import { createNodeHttpClient } from "./nodeHttpClient";

/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient(_options?: CreateHttpClientOptions): HttpClient {
  return createNodeHttpClient();
}
