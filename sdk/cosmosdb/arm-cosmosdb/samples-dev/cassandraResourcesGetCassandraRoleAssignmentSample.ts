// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB Cassandra Role Assignment with the given Id.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB Cassandra Role Assignment with the given Id.
 * x-ms-original-file: 2025-11-01-preview/cassandrarbac/CosmosDBCassandraRoleAssignmentGet.json
 */
async function cosmosDBCassandraRoleAssignmentGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraResources.getCassandraRoleAssignment(
    "myResourceGroupName",
    "myAccountName",
    "myRoleAssignmentId",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBCassandraRoleAssignmentGet();
}

main().catch(console.error);
