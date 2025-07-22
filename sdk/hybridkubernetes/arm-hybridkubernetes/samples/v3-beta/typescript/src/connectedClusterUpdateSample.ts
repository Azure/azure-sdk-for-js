// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KubernetesClient } from "@azure/arm-hybridkubernetes";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to aPI to update certain properties of the connected cluster resource
 *
 * @summary aPI to update certain properties of the connected cluster resource
 * x-ms-original-file: 2024-12-01-preview/UpdateClusterByPatchExample.json
 */
async function updateClusterExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new KubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.update("k8sc-rg", "testCluster", {
    properties: {
      azureHybridBenefit: "NotApplicable",
      distribution: "AKS",
      distributionVersion: "1.0",
    },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateClusterExample();
}

main().catch(console.error);
