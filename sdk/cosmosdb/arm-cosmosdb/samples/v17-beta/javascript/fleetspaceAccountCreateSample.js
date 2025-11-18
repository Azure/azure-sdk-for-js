// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates an Azure Cosmos DB fleetspace account under a fleetspace.
 *
 * @summary Creates an Azure Cosmos DB fleetspace account under a fleetspace.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/fleet/CosmosDBFleetspaceAccountCreate.json
 */
async function cosmosDbFleetspaceAccountCreate() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "rg1";
  const fleetName = "fleet1";
  const fleetspaceName = "fleetspace1";
  const fleetspaceAccountName = "db1";
  const body = {
    globalDatabaseAccountProperties: {
      armLocation: "West US",
      resourceId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/providers/Microsoft.DocumentDB/resourceGroup/rg1/databaseAccounts/db1",
    },
  };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.fleetspaceAccount.beginCreateAndWait(
    resourceGroupName,
    fleetName,
    fleetspaceName,
    fleetspaceAccountName,
    body,
  );
  console.log(result);
}

async function main() {
  await cosmosDbFleetspaceAccountCreate();
}

main().catch(console.error);
