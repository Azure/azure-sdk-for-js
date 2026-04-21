// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the Cassandra keyspaces under an existing Azure Cosmos DB database account.
 *
 * @summary lists the Cassandra keyspaces under an existing Azure Cosmos DB database account.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBCassandraKeyspaceList.json
 */
async function cosmosDBCassandraKeyspaceList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-1111-2222-3333-444444444444";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraResources.listCassandraKeyspaces("rgName", "ddb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBCassandraKeyspaceList();
}

main().catch(console.error);
