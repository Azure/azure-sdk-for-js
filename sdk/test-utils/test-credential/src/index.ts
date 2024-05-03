// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential } from "@azure/identity";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { NoOpCredential } from "./noOpCredential";
import { isBrowser } from "@azure/core-util";
import { createBrowserRelayCredential } from "./browserRelayCredential";

export interface CreateTestCredentialOptions {
  tenantId?: string;
  clientId?: string;
  clientSecret?: string;
}

/**
 * ## Credential to be used in the tests.
 *
 * ### In playback mode
 *  - returns the NoOpCredential (helps bypass the AAD traffic)
 *
 * ### In record/live modes
 *  - Returns DefaultAzureCredential in Node
 *  - Returns browser relay credntial in browser
 *  - AAD traffic won't be recorded if this credential is used.
 */
export function createTestCredential() {
  if (isPlaybackMode()) {
    return new NoOpCredential();
  } else if (isBrowser) {
    return createBrowserRelayCredential();
  } else {
    return new DefaultAzureCredential();
  }
}

export { NoOpCredential };
