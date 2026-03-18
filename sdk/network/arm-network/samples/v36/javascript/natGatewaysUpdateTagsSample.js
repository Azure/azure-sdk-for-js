// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates nat gateway tags.
 *
 * @summary Updates nat gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NatGatewayUpdateTags.json
 */
async function updateNatGatewayTags() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const natGatewayName = "test-natGateway";
  const parameters = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.updateTags(resourceGroupName, natGatewayName, parameters);
  console.log(result);
}

/**
 * This sample demonstrates how to Updates nat gateway tags.
 *
 * @summary Updates nat gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NatGatewayUpdateTagsStandardV2Sku.json
 */
async function updateNatGatewayWithStandardV2SkuTags() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const natGatewayName = "test-natGateway";
  const parameters = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.updateTags(resourceGroupName, natGatewayName, parameters);
  console.log(result);
}

async function main() {
  await updateNatGatewayTags();
  await updateNatGatewayWithStandardV2SkuTags();
}

main().catch(console.error);
