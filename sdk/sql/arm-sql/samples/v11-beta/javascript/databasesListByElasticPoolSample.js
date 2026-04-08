// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SqlManagementClient } = require("@azure/arm-sql");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of databases in an elastic pool.
 *
 * @summary gets a list of databases in an elastic pool.
 * x-ms-original-file: 2025-02-01-preview/ListDatabasesByElasticPool.json
 */
async function getsAListOfDatabasesInAnElasticPool() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new SqlManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.databases.listByElasticPool(
    "Default-SQL-SouthEastAsia",
    "testsvr",
    "pool1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAListOfDatabasesInAnElasticPool();
}

main().catch(console.error);
