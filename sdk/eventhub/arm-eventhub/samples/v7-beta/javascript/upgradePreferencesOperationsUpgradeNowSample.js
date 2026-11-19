// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { EventHubManagementClient } = require("@azure/arm-eventhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts an immediate eight-hour upgrade override when an upgrade is pending.
 *
 * @summary starts an immediate eight-hour upgrade override when an upgrade is pending.
 * x-ms-original-file: 2026-07-01-preview/Clusters/UpgradePreferencesUpgradeNow.json
 */
async function startAnUpgradeImmediately() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new EventHubManagementClient(credential, subscriptionId);
  const result = await client.upgradePreferencesOperations.upgradeNow(
    "contoso-rg",
    "contoso-cluster",
  );
  console.log(result);
}

async function main() {
  await startAnUpgradeImmediately();
}

main().catch(console.error);
