// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DeviceRegistryManagementClient } = require("@azure/arm-deviceregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list NamespaceDiscoveredDevice resources by Namespace
 *
 * @summary list NamespaceDiscoveredDevice resources by Namespace
 * x-ms-original-file: 2025-10-01/List_NamespaceDiscoveredDevices_ByResourceGroup.json
 */
async function listNamespaceDiscoveredDevicesByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceDiscoveredDevices.listByResourceGroup(
    "myResourceGroup",
    "my-namespace-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listNamespaceDiscoveredDevicesByResourceGroup();
}

main().catch(console.error);
