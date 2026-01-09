// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin graphs under a specific database. This helps in scenario where container was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 *
 * @summary Show the event feed of all mutations done on all the Azure Cosmos DB Gremlin graphs under a specific database. This helps in scenario where container was accidentally deleted. This API requires 'Microsoft.DocumentDB/locations/restorableDatabaseAccounts/.../read' permission
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBRestorableGremlinGraphList.json
 */
async function cosmosDbRestorableGremlinGraphList() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const location = "WestUS";
  const instanceId = "98a570f2-63db-4117-91f0-366327b7b353";
  const restorableGremlinDatabaseRid = "PD5DALigDgw=";
  const options = {
    restorableGremlinDatabaseRid,
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.restorableGremlinGraphs.list(location, instanceId, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await cosmosDbRestorableGremlinGraphList();
}

main().catch(console.error);
