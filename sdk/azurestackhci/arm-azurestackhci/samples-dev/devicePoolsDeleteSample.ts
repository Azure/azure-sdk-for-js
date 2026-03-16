// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a DevicePool
 *
 * @summary delete a DevicePool
 * x-ms-original-file: 2026-03-01-preview/DevicePools_Delete_MaximumSet_Gen.json
 */
async function devicePoolsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.devicePools.delete("ArcInstance-rg", "devicePool1");
}

/**
 * This sample demonstrates how to delete a DevicePool
 *
 * @summary delete a DevicePool
 * x-ms-original-file: 2026-03-01-preview/DevicePools_Delete_MinimumSet_Gen.json
 */
async function devicePoolsDeleteMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.devicePools.delete("ArcInstance-rg", "devicePool1");
}

async function main(): Promise<void> {
  await devicePoolsDeleteMaximumSet();
  await devicePoolsDeleteMinimumSet();
}

main().catch(console.error);
