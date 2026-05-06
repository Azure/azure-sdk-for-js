// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a new bare metal machine or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 *
 * @summary create a new bare metal machine or update the properties of the existing one. All customer initiated requests will be rejected as the life cycle of this resource is managed by the system.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Create.json
 */
async function createOrUpdateBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.createOrUpdate(
    "resourceGroupName",
    "bareMetalMachineName",
    {
      extendedLocation: {
        name: "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.ExtendedLocation/customLocations/clusterExtendedLocationName",
        type: "CustomLocation",
      },
      location: "location",
      bmcConnectionString: "redfish+https://10.10.10.16/redfish/v1/Systems/System.Embedded.1",
      bmcCredentials: { password: "{password}", username: "bmcuser" },
      bmcMacAddress: "00:00:4f:00:57:00",
      bootMacAddress: "00:00:4e:00:58:af",
      machineDetails: "User-provided machine details.",
      machineName: "r01c001",
      machineSkuId: "684E-3B16-399E",
      rackId:
        "/subscriptions/123e4567-e89b-12d3-a456-426655440000/resourceGroups/resourceGroupName/providers/Microsoft.NetworkCloud/racks/rackName",
      rackSlot: 1,
      serialNumber: "BM1219XXX",
      tags: { key1: "myvalue1", key2: "myvalue2" },
    },
  );
  console.log(result);
}

async function main() {
  await createOrUpdateBareMetalMachine();
}

main().catch(console.error);
