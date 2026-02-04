// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the cluster monitoring user credentials of a managed cluster.
 *
 * @summary lists the cluster monitoring user credentials of a managed cluster.
 * x-ms-original-file: 2025-10-02-preview/ManagedClustersListClusterCredentialResult.json
 */
async function getManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.managedClusters.listClusterMonitoringUserCredentials(
    "rg1",
    "clustername1",
  );
  console.log(result);
}

async function main() {
  await getManagedCluster();
}

main().catch(console.error);
