// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to patch properties of the provided Kubernetes cluster feature.
 *
 * @summary patch properties of the provided Kubernetes cluster feature.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusterFeatures_Patch.json
 */
async function patchKubernetesClusterFeature() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.kubernetesClusterFeatures.update(
    "resourceGroupName",
    "kubernetesClusterName",
    "featureName",
    {
      kubernetesClusterFeatureUpdateParameters: {
        options: [{ key: "featureOptionName", value: "featureOptionValue" }],
        tags: { key1: "myvalue1", key2: "myvalue2" },
      },
    },
  );
  console.log(result);
}

async function main() {
  await patchKubernetesClusterFeature();
}

main().catch(console.error);
