// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list NamespaceDevice resources by Namespace
 *
 * @summary list NamespaceDevice resources by Namespace
 * x-ms-original-file: 2025-10-01/List_NamespaceDevices_ByResourceGroup.json
 */
async function listNamespaceDevicesByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new DeviceRegistryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.namespaceDevices.listByResourceGroup(
    "myResourceGroup",
    "adr-namespace-gbk0925-n01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listNamespaceDevicesByResourceGroup();
}

main().catch(console.error);
