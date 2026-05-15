// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified peering from a Virtual Router.
 *
 * @summary deletes the specified peering from a Virtual Router.
 * x-ms-original-file: 2025-05-01/VirtualRouterPeeringDelete.json
 */
async function deleteVirtualRouterPeering(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualRouterPeerings.delete("rg1", "virtualRouter", "peering1");
}

async function main(): Promise<void> {
  await deleteVirtualRouterPeering();
}

main().catch(console.error);
