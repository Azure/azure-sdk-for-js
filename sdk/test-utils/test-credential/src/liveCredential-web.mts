// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TokenCredential } from "@azure/core-auth";
import type { CreateTestCredentialOptions } from "./index.js";
import { createBrowserRelayCredential } from "./browserRelayCredential.js";

/**
 * Creates a live credential for browser environments.
 * Uses the browser relay credential which communicates with a relay server.
 */
export function createLiveCredential(
  tokenCredentialOptions: CreateTestCredentialOptions = {},
): TokenCredential {
  return createBrowserRelayCredential(tokenCredentialOptions);
}
