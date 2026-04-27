// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeveloperHubServiceClient } from "@azure/arm-devhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to callback URL to hit once authenticated with Entra ID to have the service store the OAuth token.
 *
 * @summary callback URL to hit once authenticated with Entra ID to have the service store the OAuth token.
 * x-ms-original-file: 2025-03-01-preview/ADOOAuthDefault.json
 */
async function adoOAuthCallback(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeveloperHubServiceClient(credential, subscriptionId);
  const result = await client.adooAuth.get("eastus2euap");
  console.log(result);
}

async function main(): Promise<void> {
  await adoOAuthCallback();
}

main().catch(console.error);
