// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified capability of a virtual network appliance.
 *
 * @summary deletes the specified capability of a virtual network appliance.
 * x-ms-original-file: 2026-03-01/VirtualNetworkApplianceCapabilities_Delete.json
 */
async function deleteVirtualNetworkApplianceCapability() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkApplianceCapabilities.delete("rg1", "test-vna", "pl-fastpath");
}

async function main() {
  await deleteVirtualNetworkApplianceCapability();
}

main().catch(console.error);
