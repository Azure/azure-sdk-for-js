// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureCliCredential,
  AzureDeveloperCliCredential,
  AzurePowerShellCredential,
  ChainedTokenCredential,
  DefaultAzureCredentialClientIdOptions,
  DefaultAzureCredentialOptions,
  DefaultAzureCredentialResourceIdOptions,
  EnvironmentCredential,
} from "@azure/identity";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { NoOpCredential } from "./noOpCredential";
import { TokenCredential } from "@azure/core-auth";
import { isBrowser } from "@azure/core-util";
import { createBrowserRelayCredential } from "./browserRelayCredential";

/**
 * Alias of the different possible options shapes for the DefaultAzureCredential constructor.
 */
export type DefaultAzureCredentialCombinedOptions =
  | DefaultAzureCredentialClientIdOptions
  | DefaultAzureCredentialResourceIdOptions
  | DefaultAzureCredentialOptions;

/**
 * Options to be passed to createTestCredential.
 * These options are the same as DefaultAzureCredential, with the addition of an option for the relay server
 * URL used in browser tests.
 */
export type CreateTestCredentialOptions = DefaultAzureCredentialCombinedOptions & {
  /**
   * URL of the relay server for the browser relay credential used in browser tests.
   */
  browserRelayServerUrl?: string;
};

/**
 * ## Credential to be used in the tests.
 *
 * ### In playback mode
 *  - returns the NoOpCredential (helps bypass the AAD traffic)
 *
 * ### In record/live modes
 *  - returns the ChainedTokenCredential in Node (expects that you used [`User Auth` or `Auth via development tools`](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#authenticate-users) credentials)
 *  - Returns browser relay credential in browser. Requires the dev-tool browser relay server to be running (dev-tool run start-browser-relay, or is automatically started when using the dev-tool browser test command)
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
    return new ChainedTokenCredential(
      new AzurePowerShellCredential(dacOptions),
      new AzureCliCredential(dacOptions),
      new AzureDeveloperCliCredential(dacOptions),
      // Keep Environment Credential for packages that have not migrated to Federated Authentication
      // See the migration guide for more information
      // https://dev.azure.com/azure-sdk/internal/_wiki/wikis/internal.wiki/1080/Secret-auth-migration
      new EnvironmentCredential(dacOptions),
    );
  }
}

export { NoOpCredential };
