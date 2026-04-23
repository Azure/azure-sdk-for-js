// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or updates an Azure Cosmos DB Cassandra Role Definition.
 *
 * @summary creates or updates an Azure Cosmos DB Cassandra Role Definition.
 * x-ms-original-file: 2025-11-01-preview/cassandrarbac/CosmosDBCassandraRoleDefinitionCreateUpdate.json
 */
async function cosmosDBCassandraRoleDefinitionCreateUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.createUpdateCassandraRoleDefinition(
    "myResourceGroupName",
    "myAccountName",
    "myRoleDefinitionId",
    {
      typePropertiesType: "CustomRole",
      assignableScopes: [
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/sales",
        "/subscriptions/ffffffff-ffff-ffff-ffff-ffffffffffff/resourceGroups/myResourceGroupName/providers/Microsoft.DocumentDB/databaseAccounts/myAccountName/dbs/purchases",
      ],
      permissions: [
        {
          dataActions: [
            "Microsoft.DocumentDB/databaseAccounts/cassandraDatabases/containers/entities/create",
            "Microsoft.DocumentDB/databaseAccounts/cassandraDatabases/containers/entities/read",
          ],
          notDataActions: [],
        },
      ],
      roleName: "myRoleName",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCassandraRoleDefinitionCreateUpdate();
}

main().catch(console.error);
