// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to claiming devices of the pool.
 *
 * @summary claiming devices of the pool.
 * x-ms-original-file: 2026-03-01-preview/DevicePools_ClaimDevices_MaximumSet_Gen.json
 */
async function devicePoolsClaimDevicesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.devicePools.claimDevices("ArcInstance-rg", "ptfebvgxxqllx", {
    devices: [
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.AzureStackHCI/edgeMachines/machine-1",
    ],
    claimedBy:
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.AzureStackHCI/clusters/cluster1",
  });
}

async function main(): Promise<void> {
  await devicePoolsClaimDevicesMaximumSet();
}

main().catch(console.error);
