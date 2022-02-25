// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ClientSecretCredential, TokenCredentialOptions } from "@azure/identity";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { NoOpCredential } from "./noOpCredential";

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
 *  - returns the ClientSecretCredential (expects AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET in your environment or in the .env file)
 *  - AAD traffic won't be recorded if this credential is used.
 */
export function createTestCredential(
  tokenCredentialOptions?: TokenCredentialOptions,
  createTestCredentialOptions?: CreateTestCredentialOptions
) {
  return isPlaybackMode()
    ? new NoOpCredential()
    : new ClientSecretCredential(
        createTestCredentialOptions?.tenantId ?? env["AZURE_TENANT_ID"],
        createTestCredentialOptions?.clientId ?? env["AZURE_CLIENT_ID"],
        createTestCredentialOptions?.clientSecret ?? env["AZURE_CLIENT_SECRET"],
        tokenCredentialOptions
      );
}

export { NoOpCredential };
