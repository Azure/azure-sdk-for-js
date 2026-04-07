// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list managed database schemas
 *
 * @summary list managed database schemas
 * x-ms-original-file: 2025-02-01-preview/ManagedDatabaseSchemaListByDatabase.json
 */
async function listManagedDatabaseSchemas() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.managedDatabaseSchemas.listByDatabase(
    "myRG",
    "myManagedInstanceName",
    "myDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagedDatabaseSchemas();
}

main().catch(console.error);
