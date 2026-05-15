// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a VirtualNetworkTap
 *
 * @summary get a VirtualNetworkTap
 * x-ms-original-file: 2025-05-01/VirtualNetworkTapGet.json
 */
async function getVirtualNetworkTap(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkTaps.get("rg1", "testvtap");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualNetworkTap();
}

main().catch(console.error);
