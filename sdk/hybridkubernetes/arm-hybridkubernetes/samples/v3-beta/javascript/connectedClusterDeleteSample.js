// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesClient } = require("@azure/arm-hybridkubernetes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM).
 *
 * @summary delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM).
 * x-ms-original-file: 2024-12-01-preview/DeleteClusterExample.json
 */
async function deleteClusterExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  await client.connectedCluster.delete("k8sc-rg", "testCluster");
}

async function main() {
  await deleteClusterExample();
}

main().catch(console.error);
