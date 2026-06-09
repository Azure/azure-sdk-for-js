// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementClient } from "@azure/arm-sql";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of databases.
 *
 * @summary gets a list of databases.
 * x-ms-original-file: 2025-01-01/ListVCoreDatabasesByServer.json
 */
async function getsAListOfDatabases(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
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
 * x-ms-original-file: 2025-01-01/ListVCoreDatabasesEnclaveTypeByServer.json
 */
async function getsAListOfDatabasesConfiguredWithEnclaveType(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listByServer("Default-SQL-SouthEastAsia", "testsvr")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAListOfDatabases();
  await getsAListOfDatabasesConfiguredWithEnclaveType();
}

main().catch(console.error);
