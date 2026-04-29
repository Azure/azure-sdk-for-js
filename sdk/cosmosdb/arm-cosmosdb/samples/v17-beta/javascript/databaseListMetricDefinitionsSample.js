// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves metric definitions for the given database.
 *
 * @summary retrieves metric definitions for the given database.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBDatabaseGetMetricDefinitions.json
 */
async function cosmosDBDatabaseGetMetricDefinitions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.database.listMetricDefinitions("rg1", "ddb1", "databaseRid")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBDatabaseGetMetricDefinitions();
}

main().catch(console.error);
