// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a dropped database's short term retention policy list.
 *
 * @summary Gets a dropped database's short term retention policy list.
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/GetListManagedShortTermRetentionPolicyRestorableDropped.json
 */
async function getTheShortTermRetentionPolicyListForTheDatabase() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const managedInstanceName = "testsvr";
  const restorableDroppedDatabaseId = "testdb,131403269876900000";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedRestorableDroppedDatabaseBackupShortTermRetentionPolicies.listByRestorableDroppedDatabase(
    resourceGroupName,
    managedInstanceName,
    restorableDroppedDatabaseId,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await getTheShortTermRetentionPolicyListForTheDatabase();
}

main().catch(console.error);
