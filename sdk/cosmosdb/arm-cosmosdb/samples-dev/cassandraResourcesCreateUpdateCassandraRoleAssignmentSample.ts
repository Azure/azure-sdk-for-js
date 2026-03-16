// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Cassandra Role Assignment.
 *
 * @summary creates or updates an Azure Cosmos DB Cassandra Role Assignment.
 * x-ms-original-file: 2025-11-01-preview/cassandrarbac/CosmosDBCassandraRoleAssignmentCreateUpdate.json
 */
async function cosmosDBCassandraRoleAssignmentCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.createUpdateCassandraRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
    {
      principalId: "myPrincipalId",
      roleDefinitionId:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/cassandraRoleDefinitions/myRoleDefinitionId",
      scope:
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases/colls/redmond-purchases",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCassandraRoleAssignmentCreateUpdate();
}

main().catch(console.error);
