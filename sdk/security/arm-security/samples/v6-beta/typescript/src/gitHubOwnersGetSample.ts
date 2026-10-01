// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityCenter } from "@azure/arm-security";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns a monitored GitHub owner.
 *
 * @summary returns a monitored GitHub owner.
 * x-ms-original-file: 2025-11-01-preview/SecurityConnectorsDevOps/GetGitHubOwners_example.json
 */
async function getGitHubOwners(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0806e1cd-cfda-4ff8-b99c-2b0af42cffd3";
  const client = new SecurityCenter(credential, subscriptionId);
  const result = await client.gitHubOwners.get("myRg", "mySecurityConnectorName", "myGitHubOwner");
  console.log(result);
}

async function main(): Promise<void> {
  await getGitHubOwners();
}

main().catch(console.error);
