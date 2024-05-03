// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DefaultAzureCredential, DefaultAzureCredentialClientIdOptions, TokenCredential } from "@azure/identity";
import { isPlaybackMode } from "@azure-tools/test-recorder";
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
export function createTestCredential(
  tokenCredentialOptions?: DefaultAzureCredentialClientIdOptions
): TokenCredential {
  return isPlaybackMode()
    ? new NoOpCredential()
    : new DefaultAzureCredential(tokenCredentialOptions);
}

export { NoOpCredential };
