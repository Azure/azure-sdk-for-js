// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified public IP address in a specified resource group.
 *
 * @summary gets the specified public IP address in a specified resource group.
 * x-ms-original-file: 2025-05-01/PublicIpAddressGet.json
 */
async function getPublicIPAddress(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.get("rg1", "testDNS-ip");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified public IP address in a specified resource group.
 *
 * @summary gets the specified public IP address in a specified resource group.
 * x-ms-original-file: 2025-05-01/PublicIpAddressGetStandardV2Sku.json
 */
async function getPublicIPAddressWithStandardV2Sku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.get("rg1", "testDNS-ip");
  console.log(result);
}

async function main(): Promise<void> {
  await getPublicIPAddress();
  await getPublicIPAddressWithStandardV2Sku();
}

main().catch(console.error);
