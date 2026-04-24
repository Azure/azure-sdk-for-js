// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Table Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB Table Role Definition.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleDefinitionDelete.json
 */
async function cosmosDBTableRoleDefinitionDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.tableResources.deleteTableRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
}

async function main() {
  await cosmosDBTableRoleDefinitionDelete();
}

main().catch(console.error);
