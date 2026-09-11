// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the upgrade preferences for an Event Hubs Dedicated cluster.
 *
 * @summary gets the upgrade preferences for an Event Hubs Dedicated cluster.
 * x-ms-original-file: 2026-07-01-preview/Clusters/UpgradePreferencesGet.json
 */
async function getClusterUpgradePreferences() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.upgradePreferencesOperations.get("contoso-rg", "contoso-cluster");
  console.log(result);
}

async function main() {
  await getClusterUpgradePreferences();
}

main().catch(console.error);
