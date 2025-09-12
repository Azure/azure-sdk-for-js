// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists the long term retention backups for a given managed instance.
 *
 * @summary Lists the long term retention backups for a given managed instance.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2021-05-01-preview/examples/ManagedInstanceLongTermRetentionBackupListByInstance.json
 */
async function getAllLongTermRetentionBackupsUnderTheManagedInstance() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const locationName = "japaneast";
  const managedInstanceName = "testInstance";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.longTermRetentionManagedInstanceBackups.listByInstance(
    locationName,
    managedInstanceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getAllLongTermRetentionBackupsUnderTheManagedInstance();
}

main().catch(console.error);
