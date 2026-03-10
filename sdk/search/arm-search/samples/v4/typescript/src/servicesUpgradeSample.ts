// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SearchManagementClient } from "@azure/arm-search";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to upgrades the Azure AI Search service to the latest version available.
 *
 * @summary upgrades the Azure AI Search service to the latest version available.
 * x-ms-original-file: 2025-05-01/UpgradeSearchServiceToLatestVersion.json
 */
async function upgradeSearchServiceToLatestVersion(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.upgrade("rg1", "mysearchservice");
  console.log(result);
}

async function main(): Promise<void> {
  await upgradeSearchServiceToLatestVersion();
}

main().catch(console.error);
