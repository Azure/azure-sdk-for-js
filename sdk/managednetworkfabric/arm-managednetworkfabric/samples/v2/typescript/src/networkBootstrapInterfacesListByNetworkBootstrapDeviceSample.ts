// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the Network Bootstrap Interface resources in a given resource group.
 *
 * @summary list all the Network Bootstrap Interface resources in a given resource group.
 * x-ms-original-file: 2025-07-15/NetworkBootstrapInterfaces_ListByNetworkBootstrapDevice.json
 */
async function networkBootstrapInterfacesListByNetworkBootstrapDeviceMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1234ABCD-0A1B-1234-5678-123456ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkBootstrapInterfaces.listByNetworkBootstrapDevice(
    "example-rg",
    "example-device",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkBootstrapInterfacesListByNetworkBootstrapDeviceMaximumSetGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
}

main().catch(console.error);
