// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NamespaceDiscoveredDevice resources by Namespace
 *
 * @summary list NamespaceDiscoveredDevice resources by Namespace
 * x-ms-original-file: 2026-11-01/List_NamespaceDiscoveredDevices_ByNamespace.json
 */
async function listNamespaceDiscoveredDevicesByNamespace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceDiscoveredDevices.listByNamespace(
    "myResourceGroup",
    "my-namespace-1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNamespaceDiscoveredDevicesByNamespace();
}

main().catch(console.error);
