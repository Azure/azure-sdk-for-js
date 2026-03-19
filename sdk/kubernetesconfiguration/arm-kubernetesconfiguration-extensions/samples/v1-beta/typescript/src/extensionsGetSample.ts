// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionsClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Kubernetes Cluster Extension.
 *
 * @summary gets Kubernetes Cluster Extension.
 * x-ms-original-file: 2024-11-01/GetExtension.json
 */
async function getExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
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
async function getExtensionWithPlan(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.get(
    "rg1",
    "Microsoft.Kubernetes",
    "connectedClusters",
    "clusterName1",
    "azureVote",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getExtension();
  await getExtensionWithPlan();
}

main().catch(console.error);
