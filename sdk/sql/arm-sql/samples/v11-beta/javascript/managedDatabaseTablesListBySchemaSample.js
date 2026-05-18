// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list managed database tables
 *
 * @summary list managed database tables
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseTableListBySchema.json
 */
async function listManagedDatabaseTables() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseTables.listBySchema(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
    "dbo",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedDatabaseTables();
}

main().catch(console.error);
