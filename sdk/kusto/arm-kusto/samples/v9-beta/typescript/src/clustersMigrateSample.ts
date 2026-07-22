// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to migrate data from a Kusto cluster to another cluster.
 *
 * @summary migrate data from a Kusto cluster to another cluster.
 * x-ms-original-file: 2025-02-14/KustoClusterMigrate.json
 */
async function kustoClusterMigrate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "12345678-1234-1234-1234-123456789098";
  const client = new KustoManagementClient(credential, subscriptionId);
  await client.clusters.migrate("kustorptest", "kustoCluster1", {
    clusterResourceId:
      "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Kusto/clusters/kustoCluster2",
  });
}

async function main(): Promise<void> {
  await kustoClusterMigrate();
}

main().catch(console.error);
