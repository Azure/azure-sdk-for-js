// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified Virtual Router Peering.
 *
 * @summary gets the specified Virtual Router Peering.
 * x-ms-original-file: 2025-05-01/VirtualRouterPeeringGet.json
 */
async function getVirtualRouterPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualRouterPeerings.get("rg1", "virtualRouter", "peering1");
  console.log(result);
}

async function main(): Promise<void> {
  await getVirtualRouterPeering();
}

main().catch(console.error);
