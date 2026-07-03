// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureArcDataClient } = require("@azure/arm-azurearcdata");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list the databases associated with the given Arc Sql Server.
 *
 * @summary list the databases associated with the given Arc Sql Server.
 * x-ms-original-file: 2026-03-01-preview/ListBySqlServerInstanceDatabase.json
 */
async function getsAllDatabasesAssociatedWithAnArcEnabledSqlServer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new AzureArcDataClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.sqlServerDatabases.list("testrg", "testSqlServerInstance")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsAllDatabasesAssociatedWithAnArcEnabledSqlServer();
}

main().catch(console.error);
