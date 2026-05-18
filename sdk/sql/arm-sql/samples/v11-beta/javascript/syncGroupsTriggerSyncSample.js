// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to triggers a sync group synchronization.
 *
 * @summary triggers a sync group synchronization.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupTriggerSync.json
 */
async function triggerASyncGroupSynchronization() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.syncGroups.triggerSync(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
  );
}

async function main() {
  await triggerASyncGroupSynchronization();
}

main().catch(console.error);
