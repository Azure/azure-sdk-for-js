// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureCliCredential,
  AzureDeveloperCliCredential,
  AzurePipelinesCredential,
  AzurePowerShellCredential,
  ChainedTokenCredential,
  EnvironmentCredential,
} from "@azure/identity";
import type { TokenCredential } from "@azure/core-auth";
import type { CreateTestCredentialOptions } from "./index.js";

/**
 * Creates a live credential for Node.js environments.
 * Uses Azure Pipelines credential when running in CI, otherwise uses a
 * ChainedTokenCredential with developer tools credentials.
 */
export function createLiveCredential(
  tokenCredentialOptions: CreateTestCredentialOptions = {},
): TokenCredential {
  const { browserRelayServerUrl: _, ...dacOptions } = tokenCredentialOptions;
  const systemAccessToken = process.env.SYSTEM_ACCESSTOKEN;
  // If we have a system access token, we are in Azure Pipelines
  if (systemAccessToken) {
    const serviceConnectionID = process.env.AZURESUBSCRIPTION_SERVICE_CONNECTION_ID;
    const clientID = process.env.AZURESUBSCRIPTION_CLIENT_ID;
    const tenantID = process.env.AZURESUBSCRIPTION_TENANT_ID;
    if (serviceConnectionID && clientID && tenantID) {
      return new AzurePipelinesCredential(
        tenantID,
        clientID,
        serviceConnectionID,
        systemAccessToken,
        dacOptions,
      );
    }
    throw new Error(`Running in Azure Pipelines environment. Missing environment variables: 
        serviceConnectionID: ${serviceConnectionID}, tenantID: ${tenantID}, clientID: ${clientID}`);
  }
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
