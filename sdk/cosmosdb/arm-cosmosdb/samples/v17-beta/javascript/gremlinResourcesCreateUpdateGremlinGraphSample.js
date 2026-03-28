// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update an Azure Cosmos DB Gremlin graph
 *
 * @summary create or update an Azure Cosmos DB Gremlin graph
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGremlinGraphCreateUpdate.json
 */
async function cosmosDBGremlinGraphCreateUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.createUpdateGremlinGraph(
    "rg1",
    "ddb1",
    "databaseName",
    "graphName",
    {
      location: "West US",
      options: {},
      resource: {
        conflictResolutionPolicy: { conflictResolutionPath: "/path", mode: "LastWriterWins" },
        defaultTtl: 100,
        id: "graphName",
        indexingPolicy: {
          automatic: true,
          excludedPaths: [],
          includedPaths: [
            {
              path: "/*",
              indexes: [
                { dataType: "String", kind: "Range", precision: -1 },
                { dataType: "Number", kind: "Range", precision: -1 },
              ],
            },
          ],
          indexingMode: "consistent",
        },
        partitionKey: { kind: "Hash", paths: ["/AccountNumber"] },
        uniqueKeyPolicy: { uniqueKeys: [{ paths: ["/testPath"] }] },
      },
      tags: {},
    },
  );
  console.log(result);
}

async function main() {
  await cosmosDBGremlinGraphCreateUpdate();
}

main().catch(console.error);
