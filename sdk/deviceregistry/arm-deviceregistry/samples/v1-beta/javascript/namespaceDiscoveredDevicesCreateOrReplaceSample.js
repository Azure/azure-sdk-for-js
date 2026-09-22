// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a NamespaceDiscoveredDevice
 *
 * @summary create a NamespaceDiscoveredDevice
 * x-ms-original-file: 2026-03-01-preview/CreateOrReplace_NamespaceDiscoveredDevice.json
 */
async function createOrReplaceNamespaceDiscoveredDevice() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDiscoveredDevices.createOrReplace(
    "myResourceGroup",
    "my-namespace-1",
    "my-discovereddevice-1",
    {
      location: "West Europe",
      extendedLocation: {
        type: "CustomLocation",
        name: "/subscriptions/00000000-0000-0000-0000-000000000000/resourcegroups/myResourceGroup/providers/microsoft.extendedlocation/customlocations/location1",
      },
      tags: { site: "building-1" },
      properties: {
        endpoints: {
          outbound: {
            assigned: {
              iothubEndpoint: {
                endpointType: "Microsoft.Devices/IotHubs",
                address: "https://iothub-for-dps.azure-devices.net",
              },
            },
          },
        },
        discoveryId: "discoveryId1",
        version: 1,
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceNamespaceDiscoveredDevice();
}

main().catch(console.error);
