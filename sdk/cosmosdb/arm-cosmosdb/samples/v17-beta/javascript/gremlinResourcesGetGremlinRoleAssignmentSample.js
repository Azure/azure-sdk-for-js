// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB Gremlin Role Assignment with the given Id.
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB Gremlin Role Assignment with the given Id.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/gremlinrbac/CosmosDBGremlinRoleAssignmentGet.json
 */
async function cosmosDbGremlinRoleAssignmentGet() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleAssignmentId = "myRoleAssignmentId";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.getGremlinRoleAssignment(
    resourceGroupName,
    accountName,
    roleAssignmentId,
  );
  console.log(result);
}

async function main() {
  await cosmosDbGremlinRoleAssignmentGet();
}

main().catch(console.error);
