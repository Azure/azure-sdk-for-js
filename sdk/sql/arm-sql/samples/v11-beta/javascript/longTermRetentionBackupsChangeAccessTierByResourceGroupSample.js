// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to change a long term retention backup access tier.
 *
 * @summary change a long term retention backup access tier.
 * x-ms-original-file: 2025-02-01-preview/ResourceGroupBasedChangeLongTermRetentionBackupAccessTier.json
 */
async function changeTheLongTermRetentionBackupStorageAccessTierForAResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.longTermRetentionBackups.changeAccessTierByResourceGroup(
    "resourceGroupName",
    "japaneast",
    "serverName",
    "databaseName",
    "55555555-6666-7777-8888-999999999999;131637960820000000;Archive",
    { backupStorageAccessTier: "Hot", operationMode: "Copy" },
  );
  console.log(result);
}

async function main() {
  await changeTheLongTermRetentionBackupStorageAccessTierForAResourceGroup();
}

main().catch(console.error);
