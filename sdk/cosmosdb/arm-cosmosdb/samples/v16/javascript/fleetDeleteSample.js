// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB Fleet.
 *
 * @summary Deletes an existing Azure Cosmos DB Fleet.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/fleet/CosmosDBFleetDelete.json
 */
async function cosmosDbFleetDelete() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleet.beginDeleteAndWait(resourceGroupName, fleetName);
  console.log(result);
}

async function main() {
  await cosmosDbFleetDelete();
}

main().catch(console.error);
