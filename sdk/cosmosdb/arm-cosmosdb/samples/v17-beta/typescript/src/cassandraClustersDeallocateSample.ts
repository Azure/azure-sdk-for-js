// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CosmosDBManagementClient } from "@azure/arm-cosmosdb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deallocate the Managed Cassandra Cluster and Associated Data Centers. Deallocation will deallocate the host virtual machine of this cluster, and reserved the data disk. This won't do anything on an already deallocated cluster. Use Start to restart the cluster.
 *
 * @summary deallocate the Managed Cassandra Cluster and Associated Data Centers. Deallocation will deallocate the host virtual machine of this cluster, and reserved the data disk. This won't do anything on an already deallocated cluster. Use Start to restart the cluster.
 * x-ms-original-file: 2025-11-01-preview/CosmosDBManagedCassandraClusterDeallocate.json
 */
async function cosmosDBManagedCassandraClusterDeallocate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new CosmosDBManagementClient(credential, subscriptionId);
  await client.cassandraClusters.deallocate("cassandra-prod-rg", "cassandra-prod");
}

async function main(): Promise<void> {
  await cosmosDBManagedCassandraClusterDeallocate();
}

main().catch(console.error);
