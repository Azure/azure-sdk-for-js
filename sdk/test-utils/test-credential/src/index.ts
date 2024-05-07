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
import { isBrowser } from "@azure/core-util";
import { createBrowserRelayCredential } from "./browserRelayCredential";

export type DefaultAzureCredentialCombinedOptions =
  | DefaultAzureCredentialClientIdOptions
  | DefaultAzureCredentialResourceIdOptions
  | DefaultAzureCredentialOptions;

export type CreateTestCredentialOptions = DefaultAzureCredentialCombinedOptions & {
  browserRelayServerUrl?: string;
};

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
  tokenCredentialOptions: CreateTestCredentialOptions = {},
): TokenCredential {
  if (isPlaybackMode()) {
    return new NoOpCredential();
  } else if (isBrowser) {
    return createBrowserRelayCredential(tokenCredentialOptions);
  } else {
    const { browserRelayServerUrl: _, ...dacOptions } = tokenCredentialOptions;
    return new DefaultAzureCredential(dacOptions);
  }
}

export { NoOpCredential };
