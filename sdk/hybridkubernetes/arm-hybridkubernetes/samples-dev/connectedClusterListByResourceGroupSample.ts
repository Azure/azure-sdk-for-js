// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to enumerate registered connected K8s clusters under a Resource Group
 *
 * @summary aPI to enumerate registered connected K8s clusters under a Resource Group
 * x-ms-original-file: 2024-12-01-preview/GetClustersByResourceGroupExample.json
 */
async function getClustersExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectedCluster.listByResourceGroup("k8sc-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getClustersExample();
}

main().catch(console.error);
