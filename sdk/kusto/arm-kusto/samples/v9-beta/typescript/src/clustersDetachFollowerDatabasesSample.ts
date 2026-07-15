// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to detaches all followers of a database owned by this cluster.
 *
 * @summary detaches all followers of a database owned by this cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterDetachFollowerDatabases.json
 */
async function kustoClusterDetachFollowerDatabases(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusters.detachFollowerDatabases("kustorptest", "kustoCluster", {
    attachedDatabaseConfigurationName: "attachedDatabaseConfigurationsTest",
    clusterResourceId:
      "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Kusto/clusters/kustoCluster2",
  });
}

async function main(): Promise<void> {
  await kustoClusterDetachFollowerDatabases();
}

main().catch(console.error);
