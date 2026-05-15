// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified public IP prefix in a specified resource group.
 *
 * @summary gets the specified public IP prefix in a specified resource group.
 * x-ms-original-file: 2025-05-01/PublicIpPrefixGet.json
 */
async function getPublicIPPrefix() {
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
async function getPublicIPPrefixWithStandardV2Sku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPPrefixes.get("rg1", "test-ipprefix");
  console.log(result);
}

async function main() {
  await getPublicIPPrefix();
  await getPublicIPPrefixWithStandardV2Sku();
}

main().catch(console.error);
