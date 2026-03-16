// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all managed Cassandra clusters in this subscription.
 *
 * @summary list all managed Cassandra clusters in this subscription.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraClusterListBySubscription.json
 */
async function cosmosDBManagedCassandraClusterListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraClusters.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBManagedCassandraClusterListBySubscription();
}

main().catch(console.error);
