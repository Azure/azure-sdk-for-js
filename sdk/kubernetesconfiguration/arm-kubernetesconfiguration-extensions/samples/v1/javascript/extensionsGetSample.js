// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { KubernetesConfigurationClient } = require("@azure/arm-kubernetesconfiguration-extensions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets Kubernetes Cluster Extension.
 *
 * @summary gets Kubernetes Cluster Extension.
 * x-ms-original-file: 2024-11-01/GetExtension.json
 */
async function getExtension() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.extensions.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "ClusterMonitor",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets Kubernetes Cluster Extension.
 *
 * @summary gets Kubernetes Cluster Extension.
 * x-ms-original-file: 2024-11-01/GetExtensionWithPlan.json
 */
async function getExtensionWithPlan() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new KubernetesConfigurationClient(credential, subscriptionId);
  const result = await client.extensions.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "azureVote",
  );
  console.log(result);
}

async function main() {
  await getExtension();
  await getExtensionWithPlan();
}

main().catch(console.error);
