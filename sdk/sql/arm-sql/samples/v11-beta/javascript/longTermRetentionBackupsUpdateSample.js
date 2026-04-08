// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates an existing long term retention backup.
 *
 * @summary updates an existing long term retention backup.
 * x-ms-original-file: 2025-02-01-preview/LongTermRetentionBackupUpdate.json
 */
async function updateTheLongTermRetentionBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.longTermRetentionBackups.update(
    "japaneast",
    "testserver",
    "testDatabase",
    "55555555-6666-7777-8888-999999999999;131637960820000000",
    { requestedBackupStorageRedundancy: "Geo" },
  );
  console.log(result);
}

async function main() {
  await updateTheLongTermRetentionBackup();
}

main().catch(console.error);
