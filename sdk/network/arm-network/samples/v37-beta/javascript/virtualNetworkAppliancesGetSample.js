// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets information about the specified virtual network appliance.
 *
 * @summary gets information about the specified virtual network appliance.
 * x-ms-original-file: 2025-05-01/VirtualNetworkAppliances_Get.json
 */
async function getVirtualNetworkAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAppliances.get("rg1", "test-vna");
  console.log(result);
}

async function main() {
  await getVirtualNetworkAppliance();
}

main().catch(console.error);
