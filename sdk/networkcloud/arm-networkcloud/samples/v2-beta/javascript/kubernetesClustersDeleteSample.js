// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided Kubernetes cluster.
 *
 * @summary delete the provided Kubernetes cluster.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusters_Delete.json
 */
async function deleteKubernetesCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.kubernetesClusters.delete(
    "resourceGroupName",
    "kubernetesClusterName",
  );
  console.log(result);
}

async function main() {
  await deleteKubernetesCluster();
}

main().catch(console.error);
