// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a NamespaceDiscoveredDevice
 *
 * @summary delete a NamespaceDiscoveredDevice
 * x-ms-original-file: 2025-10-01/Delete_NamespaceDiscoveredDevice.json
 */
async function deleteNamespaceDiscoveredDevice(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceDiscoveredDevices.delete(
    "myResourceGroup",
    "my-namespace-1",
    "my-discovereddevice-1",
  );
}

async function main(): Promise<void> {
  await deleteNamespaceDiscoveredDevice();
}

main().catch(console.error);
