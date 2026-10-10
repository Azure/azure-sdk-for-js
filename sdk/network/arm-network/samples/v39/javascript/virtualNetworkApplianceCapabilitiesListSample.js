// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all capabilities of a virtual network appliance.
 *
 * @summary gets all capabilities of a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_List.json
 */
async function listVirtualNetworkApplianceCapabilities() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualNetworkApplianceCapabilities.list("rg1", "test-vna")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listVirtualNetworkApplianceCapabilities();
}

main().catch(console.error);
