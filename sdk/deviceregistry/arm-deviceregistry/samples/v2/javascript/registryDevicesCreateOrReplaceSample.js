// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a RegistryDevice
 *
 * @summary create a RegistryDevice
 * x-ms-original-file: 2026-11-01/CreateOrReplace_RegistryDevice.json
 */
async function createOrReplaceADevice() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.registryDevices.createOrReplace(
    "myResourceGroup",
    "my-namespace-1",
    "adr-smart-device3-f191f536-f652-4eb4-b9a0-1a9d43300cab",
    {
      location: "North Europe",
      properties: {
        externalDeviceId: "adr-smart-device3-f191f536-f652-4eb4-b9a0-1a9d43300cab",
        enablementState: "Enabled",
        manufacturer: "Contoso",
        model: "SmartSensor",
        hardwareRevision: "1.0",
        softwareRevision: "5.15",
      },
    },
  );
  console.log(result);
}

async function main() {
  await createOrReplaceADevice();
}

main().catch(console.error);
