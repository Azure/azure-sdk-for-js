// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates a virtual network appliance tags.
 *
 * @summary Updates a virtual network appliance tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/VirtualNetworkAppliances_UpdateTags.json
 */
async function updateVirtualNetworkApplianceTags() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const virtualNetworkApplianceName = "test-vna";
  const parameters = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.virtualNetworkAppliances.updateTags(
    resourceGroupName,
    virtualNetworkApplianceName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await updateVirtualNetworkApplianceTags();
}

main().catch(console.error);
