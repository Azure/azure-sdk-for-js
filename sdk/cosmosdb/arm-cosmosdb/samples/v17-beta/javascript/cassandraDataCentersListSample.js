// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { CosmosDBManagementClient } = require("@azure/arm-cosmosdb");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all data centers in a particular managed Cassandra cluster.
 *
 * @summary list all data centers in a particular managed Cassandra cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraDataCenterList.json
 */
async function cosmosDBManagedCassandraDataCenterList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.cassandraDataCenters.list(
    "cassandra-prod-rg",
    "cassandra-prod",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cosmosDBManagedCassandraDataCenterList();
}

main().catch(console.error);
