// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new Kubernetes cluster feature or update properties of the Kubernetes cluster feature if it exists.
 *
 * @summary create a new Kubernetes cluster feature or update properties of the Kubernetes cluster feature if it exists.
 * x-ms-original-file: 2026-05-01-preview/KubernetesClusterFeatures_Create.json
 */
async function createOrUpdateKubernetesClusterFeature() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.kubernetesClusterFeatures.createOrUpdate(
    "resourceGroupName",
    "kubernetesClusterName",
    "featureName",
    {
      location: "location",
      options: [{ key: "featureOptionName", value: "featureOptionValue" }],
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateKubernetesClusterFeature();
}

main().catch(console.error);
