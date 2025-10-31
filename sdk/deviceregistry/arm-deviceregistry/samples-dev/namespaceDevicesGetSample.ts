// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a NamespaceDevice
 *
 * @summary get a NamespaceDevice
 * x-ms-original-file: 2025-10-01/Get_NamespaceDevice.json
 */
async function getNamespaceDevice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDevices.get(
    "myResourceGroup",
    "my-namespace-1",
    "my-device-name",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a NamespaceDevice
 *
 * @summary get a NamespaceDevice
 * x-ms-original-file: 2025-10-01/Get_NamespaceDeviceWithEndpointErrorStatus.json
 */
async function getNamespaceDeviceWithEndpointErrorStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const result = await client.namespaceDevices.get(
    "myResourceGroup",
    "my-namespace-1",
    "my-device-name",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getNamespaceDevice();
  await getNamespaceDeviceWithEndpointErrorStatus();
}

main().catch(console.error);
