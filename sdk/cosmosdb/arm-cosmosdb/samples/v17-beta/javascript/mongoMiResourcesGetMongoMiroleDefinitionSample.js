// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves the properties of an existing Azure Cosmos DB MongoMI Role Definition with the given Id.
 *
 * @summary Retrieves the properties of an existing Azure Cosmos DB MongoMI Role Definition with the given Id.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/mongoMIrbac/CosmosDBMongoMIRoleDefinitionGet.json
 */
async function cosmosDbMongoMiroleDefinitionGet() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName = process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleDefinitionId = "myRoleDefinitionId";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.mongoMIResources.getMongoMIRoleDefinition(
    resourceGroupName,
    accountName,
    roleDefinitionId,
  );
  console.log(result);
}

async function main() {
  await cosmosDbMongoMiroleDefinitionGet();
}

main().catch(console.error);
