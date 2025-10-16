// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List the user activities of a data warehouse which includes running and suspended queries
 *
 * @summary List the user activities of a data warehouse which includes running and suspended queries
 * x-ms-original-file: specification/sql/resource-manager/Microsoft.Sql/preview/2020-11-01-preview/examples/ListDataWarehouseUserActivities.json
 */
async function listOfTheUserActivitiesOfADataWarehouse() {
  const subscriptionId =
    process.env["SQL_SUBSCRIPTION_ID"] || "00000000-1111-2222-3333-444444444444";
  const resourceGroupName = process.env["SQL_RESOURCE_GROUP"] || "Default-SQL-SouthEastAsia";
  const serverName = "testsvr";
  const databaseName = "testdb";
  const credential = new DefaultAzureCredential();
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.dataWarehouseUserActivitiesOperations.listByDatabase(
    resourceGroupName,
    serverName,
    databaseName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listOfTheUserActivitiesOfADataWarehouse();
}

main().catch(console.error);
