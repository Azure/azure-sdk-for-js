// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete the provided Kubernetes cluster feature.
 *
 * @summary delete the provided Kubernetes cluster feature.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusterFeatures_Delete.json
 */
async function deleteKubernetesClusterFeature(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.kubernetesClusterFeatures.delete(
    "resourceGroupName",
    "kubernetesClusterName",
    "featureName",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteKubernetesClusterFeature();
}

main().catch(console.error);
