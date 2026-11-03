// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureNetworkFabricManagementServiceAPI } from "@azure/arm-managednetworkfabric";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves details of this Network Tap.
 *
 * @summary retrieves details of this Network Tap.
 * x-ms-original-file: 2025-07-15/NetworkTaps_Get.json
 */
async function networkTapsGetMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0000ABCD-0A0B-0000-0000-000000ABCDEF";
  const client = new AzureNetworkFabricManagementServiceAPI(credential, subscriptionId);
  const result = await client.networkTaps.get("example-rg", "example-networkTap");
  console.log(result);
}

async function main(): Promise<void> {
  await networkTapsGetMaximumSetGen();
}

main().catch(console.error);
