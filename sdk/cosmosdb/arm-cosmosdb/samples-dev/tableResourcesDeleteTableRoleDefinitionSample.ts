// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Table Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB Table Role Definition.
 * x-ms-original-file: 2025-11-01-preview/tablerbac/CosmosDBTableRoleDefinitionDelete.json
 */
async function cosmosDBTableRoleDefinitionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.tableResources.deleteTableRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
}

async function main(): Promise<void> {
  await cosmosDBTableRoleDefinitionDelete();
}

main().catch(console.error);
