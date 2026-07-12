// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ExtensionsClient } from "@azure/arm-kubernetesconfiguration-extensions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets Kubernetes Cluster Extension.
 *
 * @summary gets Kubernetes Cluster Extension.
 * x-ms-original-file: 2025-03-01/GetExtension.json
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
 * x-ms-original-file: 2025-03-01/GetExtensionWithAdditionalDetails.json
 */
async function getExtensionWithAdditionalDetails(): Promise<void> {
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
 * x-ms-original-file: 2025-03-01/GetExtensionWithExtensionState.json
 */
async function getExtensionWithExtensionState(): Promise<void> {
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
 * x-ms-original-file: 2025-03-01/GetExtensionWithManagedBy.json
 */
async function getExtensionWithManagedBy(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.get(
    "rg1",
    "Microsoft.ContainerService",
    "managedClusters",
    "clusterName1",
    "azureVote",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets Kubernetes Cluster Extension.
 *
 * @summary gets Kubernetes Cluster Extension.
 * x-ms-original-file: 2025-03-01/GetExtensionWithManagementDetails.json
 */
async function getExtensionWithManagementDetails(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId1";
  const client = new ExtensionsClient(credential, subscriptionId);
  const result = await client.extensions.get(
    "rg1",
    "Microsoft.ContainerService",
    "managedClusters",
    "clusterName1",
    "azureVote",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to gets Kubernetes Cluster Extension.
 *
 * @summary gets Kubernetes Cluster Extension.
 * x-ms-original-file: 2025-03-01/GetExtensionWithPlan.json
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
  await getExtensionWithAdditionalDetails();
  await getExtensionWithExtensionState();
  await getExtensionWithManagedBy();
  await getExtensionWithManagementDetails();
  await getExtensionWithPlan();
}

main().catch(console.error);
