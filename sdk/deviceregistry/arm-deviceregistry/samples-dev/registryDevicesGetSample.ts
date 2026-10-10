// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a RegistryDevice
 *
 * @summary get a RegistryDevice
 * x-ms-original-file: 2026-11-01/Get_RegistryDevice.json
 */
async function getADevice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.registryDevices.get(
    "myResourceGroup",
    "my-namespace-1",
    "adr-smart-device3-f191f536-f652-4eb4-b9a0-1a9d43300cab",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADevice();
}

main().catch(console.error);
