// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided Kubernetes cluster feature.
 *
 * @summary delete the provided Kubernetes cluster feature.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusterFeatures_Delete.json
 */
async function deleteKubernetesClusterFeature() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.kubernetesClusterFeatures.delete(
    "resourceGroupName",
    "kubernetesClusterName",
    "featureName",
  );
  console.log(result);
}

async function main() {
  await deleteKubernetesClusterFeature();
}

main().catch(console.error);
