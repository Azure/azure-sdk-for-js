// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the specified virtual network appliance.
 *
 * @summary deletes the specified virtual network appliance.
 * x-ms-original-file: 2025-05-01/VirtualNetworkAppliances_Delete.json
 */
async function deleteVirtualNetworkAppliance(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkAppliances.delete("rg1", "test-vna");
}

async function main(): Promise<void> {
  await deleteVirtualNetworkAppliance();
}

main().catch(console.error);
