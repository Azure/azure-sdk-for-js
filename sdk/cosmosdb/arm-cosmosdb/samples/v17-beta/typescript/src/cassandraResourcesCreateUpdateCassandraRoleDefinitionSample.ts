// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CassandraRoleDefinitionResource} from "@azure/arm-cosmosdb";
import {
  CosmosDBManagementClient,
} from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Creates or updates an Azure Cosmos DB Cassandra Role Definition.
 *
 * @summary Creates or updates an Azure Cosmos DB Cassandra Role Definition.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/preview/2025-11-01-preview/examples/cassandrarbac/CosmosDBCassandraRoleDefinitionCreateUpdate.json
 */
async function cosmosDbCassandraRoleDefinitionCreateUpdate(): Promise<void> {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] ||
    "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const resourceGroupName =
    process.env["COSMOSDB_RESOURCE_GROUP"] || "myResourceGroupName";
  const accountName = "myAccountName";
  const roleDefinitionId = "myRoleDefinitionId";
  const createUpdateCassandraRoleDefinitionParameters: CassandraRoleDefinitionResource =
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
    };
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result =
    await client.cassandraResources.beginCreateUpdateCassandraRoleDefinitionAndWait(
      resourceGroupName,
      accountName,
      roleDefinitionId,
      createUpdateCassandraRoleDefinitionParameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDbCassandraRoleDefinitionCreateUpdate();
}

main().catch(console.error);
