// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates some of the properties of a garnet cluster.
 *
 * @summary Updates some of the properties of a garnet cluster.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/CosmosDBGarnetClusterPatch.json
 */
async function cosmosDbGarnetClusterPatch() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "garnet-prod-rg";
  const clusterName = "garnet-prod";
  const body = {
    properties: { clusterType: "Production" },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.garnetClusters.beginUpdateAndWait(
    resourceGroupName,
    clusterName,
    body,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGarnetClusterPatch();
}

main().catch(console.error);
