// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified capability of a virtual network appliance.
 *
 * @summary deletes the specified capability of a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_Delete.json
 */
async function deleteVirtualNetworkApplianceCapability(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkApplianceCapabilities.delete("rg1", "test-vna", "pl-fastpath");
}

async function main(): Promise<void> {
  await deleteVirtualNetworkApplianceCapability();
}

main().catch(console.error);
