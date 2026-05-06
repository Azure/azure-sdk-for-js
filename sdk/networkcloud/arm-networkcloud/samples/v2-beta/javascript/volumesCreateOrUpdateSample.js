// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new volume or update the properties of the existing one.
 *
 * @summary create a new volume or update the properties of the existing one.
 * x-ms-original-file: 2026-05-01-preview/Volumes_Create.json
 */
async function createOrUpdateVolume() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.volumes.createOrUpdate("resourceGroupName", "volumeName", {
    extendedLocation: {
      name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
      type: "CustomLocation",
    },
    location: "location",
    sizeMiB: 1048576,
    storageApplianceId:
      "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/storageAppliances/storageApplianceName",
    tags: { key1: "myvalue1", key2: "myvalue2" },
  });
  console.log(result);
}

async function main() {
  await createOrUpdateVolume();
}

main().catch(console.error);
