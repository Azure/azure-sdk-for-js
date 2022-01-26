// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "./interfaces";
import { createFetchHttpClient } from "./fetchHttpClient";
import { createXhrHttpClient } from "./xhrHttpClient";

/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient(): HttpClient {
  const isFetch = typeof window.fetch !== "undefined";
  return isFetch ? createFetchHttpClient() : createXhrHttpClient();
}
