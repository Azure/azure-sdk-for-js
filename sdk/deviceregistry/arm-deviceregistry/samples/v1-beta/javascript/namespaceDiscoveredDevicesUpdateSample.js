// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a NamespaceDiscoveredDevice
 *
 * @summary update a NamespaceDiscoveredDevice
 * x-ms-original-file: 2026-03-01-preview/Update_NamespaceDiscoveredDevice.json
 */
async function updateNamespaceDiscoveredDevice() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDiscoveredDevices.update(
    "myResourceGroup",
    "my-namespace-1",
    "my-discovereddevice-1",
    {
      properties: {
        endpoints: {
          outbound: {
            assigned: {
              newIothubEndpoint: {
                endpointType: "Microsoft.Devices/IotHubs",
                address: "https://iothub-for-dps.azure-devices.net",
              },
            },
          },
        },
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateNamespaceDiscoveredDevice();
}

main().catch(console.error);
