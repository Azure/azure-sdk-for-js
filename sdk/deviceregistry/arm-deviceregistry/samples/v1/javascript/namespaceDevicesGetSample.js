// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a NamespaceDevice
 *
 * @summary get a NamespaceDevice
 * x-ms-original-file: 2025-10-01/Get_NamespaceDevice.json
 */
async function getNamespaceDevice() {
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
async function getNamespaceDeviceWithEndpointErrorStatus() {
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

async function main() {
  await getNamespaceDevice();
  await getNamespaceDeviceWithEndpointErrorStatus();
}

main().catch(console.error);
