// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update an Azure Cosmos DB Graph.
 *
 * @summary Create or update an Azure Cosmos DB Graph.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBGraphResourceCreateUpdate.json
 */
async function cosmosDbGraphCreateUpdate() {
  const subscriptionId = process.env["COSMOSDB_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const accountName = "ddb1";
  const graphName = "graphName";
  const createUpdateGraphParameters = {
    location: "West US",
    options: {},
    resource: { id: "graphName" },
    tags: {},
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.graphResources.beginCreateUpdateGraphAndWait(
    resourceGroupName,
    accountName,
    graphName,
    createUpdateGraphParameters,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGraphCreateUpdate();
}

main().catch(console.error);
