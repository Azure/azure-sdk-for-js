// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of inaccessible databases in a logical server
 *
 * @summary gets a list of inaccessible databases in a logical server
 * x-ms-original-file: 2025-02-01-preview/ListVCoreInaccessibleDatabasesByServer.json
 */
async function getsAListOfInaccessibleDatabasesInALogicalServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listInaccessibleByServer(
    "Default-SQL-SouthEastAsia",
    "testsvr",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAListOfInaccessibleDatabasesInALogicalServer();
}

main().catch(console.error);
