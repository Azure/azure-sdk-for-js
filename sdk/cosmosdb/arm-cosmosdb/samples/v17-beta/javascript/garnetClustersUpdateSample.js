// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates some of the properties of a garnet cluster.
 *
 * @summary updates some of the properties of a garnet cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGarnetClusterPatch.json
 */
async function cosmosDBGarnetClusterPatch() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.garnetClusters.update("garnet-prod-rg", "garnet-prod", {
    properties: { clusterType: "Production" },
  });
  console.log(result);
}

async function main() {
  await cosmosDBGarnetClusterPatch();
}

main().catch(console.error);
