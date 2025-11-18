// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all managed Cassandra clusters in this subscription.
 *
 * @summary List all managed Cassandra clusters in this subscription.
 * x-ms-original-file: specification/cosmos-db/resource-manager/Microsoft.DocumentDB/DocumentDB/stable/2025-10-15/examples/CosmosDBManagedCassandraClusterListBySubscription.json
 */
async function cosmosDbManagedCassandraClusterListBySubscription() {
  const subscriptionId =
    process.env["COSMOSDB_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraClusters.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await cosmosDbManagedCassandraClusterListBySubscription();
}

main().catch(console.error);
