// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an existing Azure Cosmos DB Cassandra Role Definition.
 *
 * @summary deletes an existing Azure Cosmos DB Cassandra Role Definition.
 * x-ms-original-file: 2026-03-15/cassandrarbac/CosmosDBCassandraRoleDefinitionDelete.json
 */
async function cosmosDBCassandraRoleDefinitionDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.cassandraResources.deleteCassandraRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
  );
}

async function main(): Promise<void> {
  await cosmosDBCassandraRoleDefinitionDelete();
}

main().catch(console.error);
