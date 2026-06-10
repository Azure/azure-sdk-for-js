// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConnectedKubernetesClient } = require("@azure/arm-hybridkubernetes");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to aPI to update certain properties of the connected cluster resource
 *
 * @summary aPI to update certain properties of the connected cluster resource
 * x-ms-original-file: 2026-05-01/UpdateClusterByPatchExample.json
 */
async function updateClusterExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1bfbb5d0-917e-4346-9026-1d3b344417f5";
  const client = new ConnectedKubernetesClient(credential, subscriptionId);
  const result = await client.connectedCluster.updateAsync("k8sc-rg", "testCluster", {
    azureHybridBenefit: "NotApplicable",
    distribution: "AKS",
    distributionVersion: "1.0",
    gateway: { enabled: true },
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateClusterExample();
}

main().catch(console.error);
