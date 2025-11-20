// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a NamespaceDiscoveredDevice
 *
 * @summary create a NamespaceDiscoveredDevice
 * x-ms-original-file: 2025-10-01/CreateOrReplace_NamespaceDiscoveredDevice.json
 */
async function createOrReplaceNamespaceDiscoveredDevice(): Promise<void> {
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
              eventGridEndpoint: {
                endpointType: "Microsoft.Devices/IoTHubs",
                address: "https://myeventgridtopic.westeurope-1.eventgrid.azure.net/api/events",
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

async function main(): Promise<void> {
  await createOrReplaceNamespaceDiscoveredDevice();
}

main().catch(console.error);
