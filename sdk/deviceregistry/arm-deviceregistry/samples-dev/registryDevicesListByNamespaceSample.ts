// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DeviceRegistryManagementClient } from "@azure/arm-deviceregistry";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list RegistryDevice resources by Namespace
 *
 * @summary list RegistryDevice resources by Namespace
 * x-ms-original-file: 2026-11-01/List_RegistryDevices_ByNamespace.json
 */
async function listDevicesForANamespace(): Promise<void> {
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

async function main(): Promise<void> {
  await listDevicesForANamespace();
}

main().catch(console.error);
