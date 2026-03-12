// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the long term retention backups for a given location based on resource group.
 *
 * @summary Lists the long term retention backups for a given location based on resource group.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2024-11-01-preview/examples/ResourceGroupBasedLongTermRetentionBackupListByLocation.json
 */
async function getAllLongTermRetentionBackupsUnderTheLocationBasedOnResourceGroup() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "testResourceGroup";
  const locationName = "japaneast";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionBackups.listByResourceGroupLocation(
    resourceGroupName,
    locationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheLocationBasedOnResourceGroup();
}

main().catch(console.error);
