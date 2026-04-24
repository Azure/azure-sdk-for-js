// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB SQL Role Definition with the given Id.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB SQL Role Definition with the given Id.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlRoleDefinitionGet.json
 */
async function cosmosDBSqlRoleDefinitionGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.sqlResources.getSqlRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBSqlRoleDefinitionGet();
}

main().catch(console.error);
