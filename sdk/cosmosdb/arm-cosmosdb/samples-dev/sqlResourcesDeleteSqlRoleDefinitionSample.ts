// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB SQL Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB SQL Role Definition.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBSqlRoleDefinitionDelete.json
 */
async function cosmosDBSqlRoleDefinitionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.sqlResources.deleteSqlRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
}

async function main(): Promise<void> {
  await cosmosDBSqlRoleDefinitionDelete();
}

main().catch(console.error);
