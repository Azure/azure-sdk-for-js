// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to shows the provisioning status of Network Fabric Controller.
 *
 * @summary shows the provisioning status of Network Fabric Controller.
 * x-ms-original-file: 2024-06-15-preview/NetworkFabricControllers_Get.json
 */
async function networkFabricControllersGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkFabricControllers.get(
    "example-rg",
    "example-networkController",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkFabricControllersGetMaximumSetGen();
}

main().catch(console.error);
