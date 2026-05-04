// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves the list of all Azure Cosmos DB Cassandra Role Definitions.
 *
 * @summary retrieves the list of all Azure Cosmos DB Cassandra Role Definitions.
 * x-ms-original-file: 2025-11-01-preview/cassandrarbac/CosmosDBCassandraRoleDefinitionList.json
 */
async function cosmosDBCassandraRoleDefinitionList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraResources.listCassandraRoleDefinitions(
    "myResourceGroupName",
    "myAccountName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBCassandraRoleDefinitionList();
}

main().catch(console.error);
