// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a RegistryDevice
 *
 * @summary delete a RegistryDevice
 * x-ms-original-file: 2026-11-01/Delete_RegistryDevice.json
 */
async function deleteADevice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.registryDevices.delete(
    "myResourceGroup",
    "my-namespace-1",
    "adr-smart-device3-f191f536-f652-4eb4-b9a0-1a9d43300cab",
  );
}

async function main(): Promise<void> {
  await deleteADevice();
}

main().catch(console.error);
