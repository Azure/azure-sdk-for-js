// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes an existing Azure Cosmos DB Fleetspace.
 *
 * @summary Deletes an existing Azure Cosmos DB Fleetspace.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetspaceDelete.json
 */
async function cosmosDbFleetspaceDelete() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.beginDeleteAndWait(
    resourceGroupName,
    fleetName,
    fleetspaceName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbFleetspaceDelete();
}

main().catch(console.error);
