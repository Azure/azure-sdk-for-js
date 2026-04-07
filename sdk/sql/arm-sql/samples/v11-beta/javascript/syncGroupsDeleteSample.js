// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a sync group.
 *
 * @summary deletes a sync group.
 * x-ms-original-file: 2025-02-01-preview/SyncGroupDelete.json
 */
async function deleteASyncGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  await client.syncGroups.delete(
    "syncgroupcrud-65440",
    "syncgroupcrud-8475",
    "syncgroupcrud-4328",
    "syncgroupcrud-3187",
  );
}

async function main() {
  await deleteASyncGroup();
}

main().catch(console.error);
