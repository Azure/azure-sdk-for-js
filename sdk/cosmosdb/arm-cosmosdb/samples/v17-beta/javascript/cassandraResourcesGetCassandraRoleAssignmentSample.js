// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves the properties of an existing Azure Cosmos DB Cassandra Role Assignment with the given Id.
 *
 * @summary retrieves the properties of an existing Azure Cosmos DB Cassandra Role Assignment with the given Id.
 * x-ms-original-file: 2025-11-01-preview/cassandrarbac/CosmosDBCassandraRoleAssignmentGet.json
 */
async function cosmosDBCassandraRoleAssignmentGet() {
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

async function main() {
  await cosmosDBCassandraRoleAssignmentGet();
}

main().catch(console.error);
