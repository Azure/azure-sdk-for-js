// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagedNetworkFabricClient } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the Network Interface resource details.
 *
 * @summary get the Network Interface resource details.
 * x-ms-original-file: 2024-06-15-preview/NetworkInterfaces_Get.json
 */
async function networkInterfacesGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new ManagedNetworkFabricClient(credential, subscriptionId);
  const result = await client.networkInterfaces.get(
    "example-rg",
    "example-device",
    "example-interface",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await networkInterfacesGetMaximumSetGen();
}

main().catch(console.error);
