// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a NamespaceDevice
 *
 * @summary update a NamespaceDevice
 * x-ms-original-file: 2025-10-01/Update_NamespaceDevice.json
 */
async function updateNamespaceDevices(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDevices.update(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
    "dev-namespace-gbk0925-n01",
    {
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
        enabled: true,
        attributes: {
          deviceType: "sensor",
          deviceOwner: "IT",
          deviceCategory: 16,
        },
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateNamespaceDevices();
}

main().catch(console.error);
