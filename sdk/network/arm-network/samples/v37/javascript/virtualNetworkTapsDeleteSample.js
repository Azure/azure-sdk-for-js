// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a VirtualNetworkTap
 *
 * @summary delete a VirtualNetworkTap
 * x-ms-original-file: 2025-05-01/VirtualNetworkTapDelete.json
 */
async function deleteVirtualNetworkTapResource() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.virtualNetworkTaps.delete("rg1", "test-vtap");
}

async function main() {
  await deleteVirtualNetworkTapResource();
}

main().catch(console.error);
