// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to remove legal hold immutability of an existing long term retention backup.
 *
 * @summary remove legal hold immutability of an existing long term retention backup.
 * x-ms-original-file: 2025-02-01-preview/RemoveLegalHoldImmutabilityLongTermRetentionBackup.json
 */
async function removeLegalHoldImmutabilityOfTheLongTermRetentionBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.longTermRetentionBackups.removeLegalHoldImmutability(
    "japaneast",
    "testserver",
    "testDatabase",
    "55555555-6666-7777-8888-999999999999;131637960820000000;Hot",
  );
  console.log(result);
}

async function main() {
  await removeLegalHoldImmutabilityOfTheLongTermRetentionBackup();
}

main().catch(console.error);
