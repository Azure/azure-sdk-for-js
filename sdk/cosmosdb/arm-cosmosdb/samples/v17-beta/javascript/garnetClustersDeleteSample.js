// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a Garnet cluster.
 *
 * @summary deletes a Garnet cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBGarnetClusterDelete.json
 */
async function cosmosDBGarnetClusterDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.garnetClusters.delete("garnet-prod-rg", "garnet-prod");
}

async function main() {
  await cosmosDBGarnetClusterDelete();
}

main().catch(console.error);
