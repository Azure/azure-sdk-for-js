// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a list of resource navigation links for a subnet.
 *
 * @summary gets a list of resource navigation links for a subnet.
 * x-ms-original-file: 2025-05-01/VirtualNetworkGetResourceNavigationLinks.json
 */
async function getResourceNavigationLinks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.resourceNavigationLinks.list("rg1", "vnet", "subnet");
  console.log(result);
}

async function main() {
  await getResourceNavigationLinks();
}

main().catch(console.error);
