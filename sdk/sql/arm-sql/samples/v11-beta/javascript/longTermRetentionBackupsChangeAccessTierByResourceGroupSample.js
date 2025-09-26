// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Change a long term retention backup access tier.
 *
 * @summary Change a long term retention backup access tier.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/ResourceGroupBasedChangeLongTermRetentionBackupAccessTier.json
 */
async function changeTheLongTermRetentionBackupStorageAccessTierForAResourceGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "resourceGroupName";
  const locationName = "japaneast";
  const longTermRetentionServerName = "serverName";
  const longTermRetentionDatabaseName = "databaseName";
  const backupName = "55555555-6666-7777-8888-999999999999;131637960820000000;Archive";
  const parameters = {
    backupStorageAccessTier: "Hot",
    operationMode: "Copy",
  };
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const result = await client.longTermRetentionBackups.beginChangeAccessTierByResourceGroupAndWait(
    resourceGroupName,
    locationName,
    longTermRetentionServerName,
    longTermRetentionDatabaseName,
    backupName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await changeTheLongTermRetentionBackupStorageAccessTierForAResourceGroup();
}

main().catch(console.error);
