// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list managed database columns
 *
 * @summary list managed database columns
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseColumnListByTable.json
 */
async function listManagedDatabaseColumns() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseColumns.listByTable(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
    "table1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedDatabaseColumns();
}

main().catch(console.error);
