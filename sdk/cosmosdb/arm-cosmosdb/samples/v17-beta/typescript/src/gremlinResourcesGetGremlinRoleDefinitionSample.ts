// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB Gremlin Role Definition with the given Id.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB Gremlin Role Definition with the given Id.
 * x-ms-original-file: 2025-11-01-preview/gremlinrbac/CosmosDBGremlinRoleDefinitionGet.json
 */
async function cosmosDBGremlinRoleDefinitionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.gremlinResources.getGremlinRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBGremlinRoleDefinitionGet();
}

main().catch(console.error);
