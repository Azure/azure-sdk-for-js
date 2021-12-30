// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential, TokenCredentialOptions } from "@azure/identity";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { NoOpCredential } from "./noOpCredential";

/**
 * ## Credential to be used in the tests.
 *
 * ### In playback mode
 *  - returns the NoOpCredential (helps bypass the AAD traffic)
 *
 * ### In record/live modes
 *  - returns the ClientSecretCredential (expects AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET in your environment or in the .env file)
 *  - AAD traffic won't be recorded if this credential is used.
 */
export function createTestCredential(options?: TokenCredentialOptions) {
  return isPlaybackMode()
    ? new NoOpCredential()
    : new ClientSecretCredential(
        env["AZURE_TENANT_ID"],
        env["AZURE_CLIENT_ID"],
        env["AZURE_CLIENT_SECRET"],
        options
      );
}

export { NoOpCredential };
