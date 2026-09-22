// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a NamespaceDevice
 *
 * @summary update a NamespaceDevice
 * x-ms-original-file: 2026-03-01-preview/Update_NamespaceDevice.json
 */
async function updateNamespaceDevices() {
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
              iothubEndpoint: {
                endpointType: "Microsoft.Devices/IotHubs",
                address: "https://iothub-for-dps.azure-devices.net",
              },
            },
          },
        },
        enabled: true,
        attributes: { deviceType: "sensor", deviceOwner: "IT", deviceCategory: 16 },
      },
    },
  );
  console.log(result);
}

async function main() {
  await updateNamespaceDevices();
}

main().catch(console.error);
