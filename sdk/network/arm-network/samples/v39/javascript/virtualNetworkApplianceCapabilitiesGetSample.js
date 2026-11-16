// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified capability of a virtual network appliance.
 *
 * @summary gets the specified capability of a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_Get.json
 */
async function getVirtualNetworkApplianceCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkApplianceCapabilities.get(
    "rg1",
    "test-vna",
    "pl-fastpath",
  );
  console.log(result);
}

async function main() {
  await getVirtualNetworkApplianceCapability();
}

main().catch(console.error);
