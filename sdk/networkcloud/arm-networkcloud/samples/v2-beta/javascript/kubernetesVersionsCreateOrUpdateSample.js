// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create the Kubernetes version resource or update its tags. This resource is system managed and should only be created with the name "default".
 *
 * @summary create the Kubernetes version resource or update its tags. This resource is system managed and should only be created with the name "default".
 * x-ms-original-file: 2026-05-01-preview/KubernetesVersions_Create.json
 */
async function createOrUpdateKubernetesVersions() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.kubernetesVersions.createOrUpdate("resourceGroupName", "default", {
    extendedLocation: {
      name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
      type: "CustomLocation",
    },
    location: "location",
    tags: { key1: "myvalue1", key2: "myvalue2" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateKubernetesVersions();
}

main().catch(console.error);
