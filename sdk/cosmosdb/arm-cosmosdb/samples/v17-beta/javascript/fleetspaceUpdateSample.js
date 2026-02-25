// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 *
 * @summary Update the properties of an existing Azure Cosmos DB fleetspace under a fleet.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetspaceUpdate.json
 */
async function cosmosDbFleetspaceUpdate() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const body = {
    fleetspaceApiKind: "NoSQL",
    throughputPoolConfiguration: {
      maxThroughput: 1000000,
      minThroughput: 100000,
    },
  };
  const options = { body };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspace.beginUpdateAndWait(
    resourceGroupName,
    fleetName,
    fleetspaceName,
    options,
  );
  console.log(result);
}

async function main() {
  await cosmosDbFleetspaceUpdate();
}

main().catch(console.error);
