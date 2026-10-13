// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a RegistryDevice
 *
 * @summary update a RegistryDevice
 * x-ms-original-file: 2026-11-01/Update_RegistryDevice.json
 */
async function updateADevice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.registryDevices.update(
    "myResourceGroup",
    "my-namespace-1",
    "adr-smart-device3-f191f536-f652-4eb4-b9a0-1a9d43300cab",
    {
      properties: {
        enablementState: "Enabled",
        manufacturer: "Contoso",
        model: "SmartSensorV2",
        hardwareRevision: "1.0",
        softwareRevision: "6.1",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateADevice();
}

main().catch(console.error);
