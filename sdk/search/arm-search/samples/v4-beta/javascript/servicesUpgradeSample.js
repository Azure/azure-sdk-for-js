// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SearchManagementClient } = require("@azure/arm-search");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrades the Azure AI Search service to the latest version available.
 *
 * @summary upgrades the Azure AI Search service to the latest version available.
 * x-ms-original-file: 2026-03-01-preview/UpgradeSearchServiceToLatestVersion.json
 */
async function upgradeSearchServiceToLatestVersion() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new SearchManagementClient(credential, subscriptionId);
  const result = await client.services.upgrade("rg1", "mysearchservice");
  console.log(result);
}

async function main() {
  await upgradeSearchServiceToLatestVersion();
}

main().catch(console.error);
