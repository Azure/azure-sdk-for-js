// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  DefaultAzureCredential,
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialResourceIdOptions,
} from "@azure/identity";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { NoOpCredential } from "./noOpCredential";
import { TokenCredential } from "@azure/core-auth";

/**
 * ## Credential to be used in the tests.
 *
 * ### In playback mode
 *  - returns the NoOpCredential (helps bypass the AAD traffic)
 *
 * ### In record/live modes
 *  - returns the DefaultAzureCredential (expects that you used [`User Auth` or `Auth via development tools`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#authenticate-users) credentials)
 *  - AAD traffic won't be recorded if this credential is used.
 */
export function createTestCredential(
  tokenCredentialOptions?:
    | DefaultAzureCredentialClientIdOptions
    | DefaultAzureCredentialResourceIdOptions
    | DefaultAzureCredentialOptions,
): TokenCredential {
  return isPlaybackMode()
    ? new NoOpCredential()
    : new DefaultAzureCredential(tokenCredentialOptions);
}

export { NoOpCredential };
