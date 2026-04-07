// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list database schemas
 *
 * @summary list database schemas
 * x-ms-original-file: 2025-02-01-preview/DatabaseSchemaListByDatabase.json
 */
async function listDatabaseSchemas() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databaseSchemas.listByDatabase(
    "myRG",
    "serverName",
    "myDatabase",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDatabaseSchemas();
}

main().catch(console.error);
