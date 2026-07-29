// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a list of all GitHub owners accessible by the user token consumed by the connector.
 *
 * @summary returns a list of all GitHub owners accessible by the user token consumed by the connector.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/ListAvailableGitHubOwners_example.json
 */
async function listAvailableGitHubOwners(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.gitHubOwners.listAvailable("myRg", "mySecurityConnectorName");
  console.log(result);
}

async function main(): Promise<void> {
  await listAvailableGitHubOwners();
}

main().catch(console.error);
