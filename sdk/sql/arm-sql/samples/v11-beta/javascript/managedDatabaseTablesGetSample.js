// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get managed database table
 *
 * @summary get managed database table
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseTableGet.json
 */
async function getManagedDatabaseTable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.managedDatabaseTables.get(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
    "table1",
  );
  console.log(result);
}

async function main() {
  await getManagedDatabaseTable();
}

main().catch(console.error);
