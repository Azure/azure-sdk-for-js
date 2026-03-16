// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a DevicePool
 *
 * @summary get a DevicePool
 * x-ms-original-file: 2026-03-01-preview/DevicePools_Get_MaximumSet_Gen.json
 */
async function devicePoolsGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.devicePools.get("ArcInstance-rg", "fflisdaccdcoj");
  console.log(result);
}

async function main(): Promise<void> {
  await devicePoolsGetMaximumSet();
}

main().catch(console.error);
