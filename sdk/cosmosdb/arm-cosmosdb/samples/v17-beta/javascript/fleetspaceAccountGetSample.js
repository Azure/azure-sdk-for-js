// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB fleetspace account under a fleetspace
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB fleetspace account under a fleetspace
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetspaceAccountGet.json
 */
async function cosmosDbFleetspaceAccountGet() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const fleetspaceAccountName = "db1";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspaceAccount.get(
    resourceGroupName,
    fleetName,
    fleetspaceName,
    fleetspaceAccountName,
  );
  console.log(result);
}

async function main() {
  await cosmosDbFleetspaceAccountGet();
}

main().catch(console.error);
