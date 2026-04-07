// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get database table
 *
 * @summary get database table
 * x-ms-original-file: 2025-02-01-preview/DatabaseTableGet.json
 */
async function getDatabaseTable() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const result = await client.databaseTables.get(
    "myRG",
    "serverName",
    "myDatabase",
    "dbo",
    "table1",
  );
  console.log(result);
}

async function main() {
  await getDatabaseTable();
}

main().catch(console.error);
