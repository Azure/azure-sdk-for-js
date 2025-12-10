// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NamespaceDiscoveredDevice
 *
 * @summary delete a NamespaceDiscoveredDevice
 * x-ms-original-file: 2025-10-01/Delete_NamespaceDiscoveredDevice.json
 */
async function deleteNamespaceDiscoveredDevice() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  await client.namespaceDiscoveredDevices.delete(
    "myResourceGroup",
    "my-namespace-1",
    "my-discovereddevice-1",
  );
}

async function main() {
  await deleteNamespaceDiscoveredDevice();
}

main().catch(console.error);
