// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified public IP address in a specified resource group.
 *
 * @summary Gets the specified public IP address in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpAddressGet.json
 */
async function getPublicIPAddress() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpAddressName = "testDNS-ip";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.get(resourceGroupName, publicIpAddressName);
  console.log(result);
}

/**
 * This sample demonstrates how to Gets the specified public IP address in a specified resource group.
 *
 * @summary Gets the specified public IP address in a specified resource group.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/PublicIpAddressGetStandardV2Sku.json
 */
async function getPublicIPAddressWithStandardV2Sku() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const publicIpAddressName = "testDNS-ip";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.publicIPAddresses.get(resourceGroupName, publicIpAddressName);
  console.log(result);
}

async function main() {
  await getPublicIPAddress();
  await getPublicIPAddressWithStandardV2Sku();
}

main().catch(console.error);
