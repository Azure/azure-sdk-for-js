// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the Network Fabric Controller resource.
 *
 * @summary deletes the Network Fabric Controller resource.
 * x-ms-original-file: 2025-07-15/NetworkFabricControllers_Delete.json
 */
async function networkFabricControllersDeleteMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  await client.networkFabricControllers.delete("example-rg", "example-networkController");
}

async function main(): Promise<void> {
  await networkFabricControllersDeleteMaximumSetGen();
}

main().catch(console.error);
