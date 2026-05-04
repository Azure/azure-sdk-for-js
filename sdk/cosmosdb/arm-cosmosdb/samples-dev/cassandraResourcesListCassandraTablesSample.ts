// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the Cassandra table under an existing Azure Cosmos DB database account.
 *
 * @summary lists the Cassandra table under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraTableList.json
 */
async function cosmosDBCassandraTableList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraResources.listCassandraTables(
    "rgName",
    "ddb1",
    "keyspaceName",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cosmosDBCassandraTableList();
}

main().catch(console.error);
