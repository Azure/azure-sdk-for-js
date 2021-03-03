// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpsClient } from "./interfaces";
import { createXhrHttpsClient } from "./xhrHttpsClient";

/**
 * Create the correct HttpsClient for the current environment.
 */
export function createDefaultHttpsClient(): HttpsClient {
  return createXhrHttpsClient();
}
