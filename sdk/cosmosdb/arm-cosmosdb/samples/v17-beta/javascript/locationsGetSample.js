// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of an existing Cosmos DB location
 *
 * @summary get the properties of an existing Cosmos DB location
 * x-ms-original-file: 2025-11-01-preview/CosmosDBLocationGet.json
 */
async function cosmosDBLocationGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.locations.get("westus");
  console.log(result);
}

async function main() {
  await cosmosDBLocationGet();
}

main().catch(console.error);
