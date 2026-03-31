// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified public IP address in a specified resource group.
 *
 * @summary gets the specified public IP address in a specified resource group.
 * x-ms-original-file: 2025-05-01/PublicIpAddressGet.json
 */
async function getPublicIPAddress() {
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
async function getPublicIPAddressWithStandardV2Sku() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.get("rg1", "testDNS-ip");
  console.log(result);
}

async function main() {
  await getPublicIPAddress();
  await getPublicIPAddressWithStandardV2Sku();
}

main().catch(console.error);
