// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a long term retention backup.
 *
 * @summary deletes a long term retention backup.
 * x-ms-original-file: 2025-02-01-preview/LongTermRetentionBackupDelete.json
 */
async function deleteTheLongTermRetentionBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  await client.longTermRetentionBackups.delete(
    "japaneast",
    "testserver",
    "testDatabase",
    "55555555-6666-7777-8888-999999999999;131637960820000000;Hot",
  );
}

async function main() {
  await deleteTheLongTermRetentionBackup();
}

main().catch(console.error);
