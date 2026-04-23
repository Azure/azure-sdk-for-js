// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the usages (most recent data) for the given database.
 *
 * @summary retrieves the usages (most recent data) for the given database.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseGetUsages.json
 */
async function cosmosDBDatabaseGetUsages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.database.listUsages("rg1", "ddb1", "databaseRid", {
    filter: "$filter=name.value eq 'Storage'",
  })) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDatabaseGetUsages();
}

main().catch(console.error);
