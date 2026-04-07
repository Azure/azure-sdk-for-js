// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of databases.
 *
 * @summary gets a list of databases.
 * x-ms-original-file: 2025-02-01-preview/ListVCoreDatabasesByServer.json
 */
async function getsAListOfDatabases() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listByServer("Default-SQL-SouthEastAsia", "testsvr")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of databases.
 *
 * @summary gets a list of databases.
 * x-ms-original-file: 2025-02-01-preview/ListVCoreDatabasesByServerWithOdata.json
 */
async function getsAListOfDatabasesWithODataFiltering() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listByServer("Default-SQL-SouthEastAsia", "testsvr")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets a list of databases.
 *
 * @summary gets a list of databases.
 * x-ms-original-file: 2025-02-01-preview/ListVCoreDatabasesEnclaveTypeByServer.json
 */
async function getsAListOfDatabasesConfiguredWithEnclaveType() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listByServer("Default-SQL-SouthEastAsia", "testsvr")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAListOfDatabases();
  await getsAListOfDatabasesWithODataFiltering();
  await getsAListOfDatabasesConfiguredWithEnclaveType();
}

main().catch(console.error);
