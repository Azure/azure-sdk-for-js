// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified public IP prefix in a specified resource group.
 *
 * @summary gets the specified public IP prefix in a specified resource group.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixGet.json
 */
async function getPublicIPPrefix(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.get("rg1", "test-ipprefix");
  console.log(result);
}

/**
 * This sample demonstrates how to gets the specified public IP prefix in a specified resource group.
 *
 * @summary gets the specified public IP prefix in a specified resource group.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixGetStandardV2Sku.json
 */
async function getPublicIPPrefixWithStandardV2Sku(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.get("rg1", "test-ipprefix");
  console.log(result);
}

async function main(): Promise<void> {
  await getPublicIPPrefix();
  await getPublicIPPrefixWithStandardV2Sku();
}

main().catch(console.error);
