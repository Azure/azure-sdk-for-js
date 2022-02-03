// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient } from "./interfaces";
import { createBrowserHttpClient } from "./browserHttpClient";

/**
 * Create the correct HttpClient for the current environment.
 */
export function createDefaultHttpClient(): HttpClient {
  return createBrowserHttpClient();
}
