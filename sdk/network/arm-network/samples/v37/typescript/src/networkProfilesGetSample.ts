// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified network profile in a specified resource group.
 *
 * @summary gets the specified network profile in a specified resource group.
 * x-ms-original-file: 2025-05-01/NetworkProfileGetConfigOnly.json
 */
async function getNetworkProfile(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkProfiles.get("rg1", "networkProfile1");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified network profile in a specified resource group.
 *
 * @summary gets the specified network profile in a specified resource group.
 * x-ms-original-file: 2025-05-01/NetworkProfileGetWithContainerNic.json
 */
async function getNetworkProfileWithContainerNetworkInterfaces(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkProfiles.get("rg1", "networkProfile1");
  console.log(result);
}

async function main(): Promise<void> {
  await getNetworkProfile();
  await getNetworkProfileWithContainerNetworkInterfaces();
}

main().catch(console.error);
