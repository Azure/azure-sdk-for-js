// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 *
 * @summary gets the Ddos Protection Status of all IP Addresses under the Virtual Network
 * x-ms-original-file: 2025-05-01/VirtualNetworkGetDdosProtectionStatus.json
 */
async function getDdosProtectionStatusOfAVirtualNetwork(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworks.listDdosProtectionStatus("rg1", "test-vnet", {
    top: 75,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getDdosProtectionStatusOfAVirtualNetwork();
}

main().catch(console.error);
