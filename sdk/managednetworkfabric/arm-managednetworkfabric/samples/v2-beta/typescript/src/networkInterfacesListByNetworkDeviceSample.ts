// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the Network Interface resources in a given resource group.
 *
 * @summary list all the Network Interface resources in a given resource group.
 * x-ms-original-file: 2024-06-15-preview/NetworkInterfaces_ListByNetworkDevice.json
 */
async function networkInterfacesListByNetworkDeviceMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaces.listByNetworkDevice(
    "example-rg",
    "example-device",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkInterfacesListByNetworkDeviceMaximumSetGen();
}

main().catch(console.error);
