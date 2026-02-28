// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists the cluster monitoring user credentials of a managed cluster.
 *
 * @summary lists the cluster monitoring user credentials of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersListClusterCredentialResult.json
 */
async function getManagedCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.listClusterMonitoringUserCredentials(
    "rg1",
    "clustername1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getManagedCluster();
}

main().catch(console.error);
