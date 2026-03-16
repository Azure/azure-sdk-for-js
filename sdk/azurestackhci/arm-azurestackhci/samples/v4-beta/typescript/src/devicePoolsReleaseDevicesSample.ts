// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to releasing devices of the pool.
 *
 * @summary releasing devices of the pool.
 * x-ms-original-file: 2026-03-01-preview/DevicePools_ReleaseDevices_MaximumSet_Gen.json
 */
async function devicePoolsReleaseDevicesMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.devicePools.releaseDevices("ArcInstance-rg", "snbyzreoirqiz", {
    devices: [
      "/subscriptions/fd3c3665-1729-4b7b-9a38-238e83b0f98b/resourceGroups/ArcInstance-rg/providers/Microsoft.AzureStackHCI/edgeMachines/machine-1",
    ],
  });
}

async function main(): Promise<void> {
  await devicePoolsReleaseDevicesMaximumSet();
}

main().catch(console.error);
