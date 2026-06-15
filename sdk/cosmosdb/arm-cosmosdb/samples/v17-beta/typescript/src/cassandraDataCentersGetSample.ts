// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of a managed Cassandra data center.
 *
 * @summary get the properties of a managed Cassandra data center.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraDataCenterGet.json
 */
async function cosmosDBManagedCassandraDataCenterGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  const result = await client.cassandraDataCenters.get(
    "cassandra-prod-rg",
    "cassandra-prod",
    "dc1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cosmosDBManagedCassandraDataCenterGet();
}

main().catch(console.error);
