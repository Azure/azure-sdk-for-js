// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list RegistryDevice resources by Namespace
 *
 * @summary list RegistryDevice resources by Namespace
 * x-ms-original-file: 2026-11-01/List_RegistryDevices_ByNamespace.json
 */
async function listDevicesForANamespace() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.registryDevices.listByNamespace(
    "myResourceGroup",
    "my-namespace-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDevicesForANamespace();
}

main().catch(console.error);
