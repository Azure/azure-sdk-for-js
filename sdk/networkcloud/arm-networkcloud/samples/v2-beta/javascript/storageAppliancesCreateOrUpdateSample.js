// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new storage appliance or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @summary create a new storage appliance or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_Create.json
 */
async function createOrUpdateStorageAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.storageAppliances.createOrUpdate(
    "resourceGroupName",
    "storageApplianceName",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
      administratorCredentials: { password: "{password}", username: "adminUser" },
      rackId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/racks/rackName",
      rackSlot: 1,
      serialNumber: "BM1219XXX",
      storageApplianceSkuId: "684E-3B16-399E",
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateStorageAppliance();
}

main().catch(console.error);
