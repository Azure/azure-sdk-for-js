// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClusterMigrateRequest } from "@azure/arm-kusto";
import { KustoManagementClient } from "@azure/arm-kusto";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Migrate data from a Kusto cluster to another cluster.
 *
 * @summary Migrate data from a Kusto cluster to another cluster.
 * x-ms-original-file: specification/azure-kusto/resource-manager/Microsoft.Kusto/stable/2024-04-13/examples/KustoClusterMigrate.json
 */
async function kustoClusterMigrate(): Promise<void> {
  const subscriptionId =
    process.env["KUSTO_SUBSCRIPTION_ID"] || "12345678-1234-1234-1234-123456789098";
  const resourceGroupName = process.env["KUSTO_RESOURCE_GROUP"] || "kustorptest";
  const clusterName = "kustoCluster1";
  const clusterMigrateRequest: ClusterMigrateRequest = {
    clusterResourceId:
      "/subscriptions/12345678-1234-1234-1234-123456789098/resourceGroups/kustorptest/providers/Microsoft.Kusto/clusters/kustoCluster2",
  };
  const credential = new DefaultAzureCredential();
  const client = new KustoManagementClient(credential, subscriptionId);
  const result = await client.clusters.beginMigrateAndWait(
    resourceGroupName,
    clusterName,
    clusterMigrateRequest,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await kustoClusterMigrate();
}

main().catch(console.error);
