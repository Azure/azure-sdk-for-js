// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a virtual network appliance tags.
 *
 * @summary updates a virtual network appliance tags.
 * x-ms-original-file: 2025-05-01/VirtualNetworkAppliances_UpdateTags.json
 */
async function updateVirtualNetworkApplianceTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAppliances.updateTags("rg1", "test-vna", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateVirtualNetworkApplianceTags();
}

main().catch(console.error);
