// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the user activities of a data warehouse which includes running and suspended queries
 *
 * @summary gets the user activities of a data warehouse which includes running and suspended queries
 * x-ms-original-file: 2025-02-01-preview/GetDataWarehouseUserActivities.json
 */
async function getTheListOfTheUserActivitiesOfADataWarehouse() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.dataWarehouseUserActivities.get(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "testdb",
    "current",
  );
  console.log(result);
}

async function main() {
  await getTheListOfTheUserActivitiesOfADataWarehouse();
}

main().catch(console.error);
