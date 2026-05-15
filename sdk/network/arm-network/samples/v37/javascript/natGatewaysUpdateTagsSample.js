// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates nat gateway tags.
 *
 * @summary updates nat gateway tags.
 * x-ms-original-file: 2025-05-01/NatGatewayUpdateTags.json
 */
async function updateNatGatewayTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.updateTags("rg1", "test-natGateway", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to updates nat gateway tags.
 *
 * @summary updates nat gateway tags.
 * x-ms-original-file: 2025-05-01/NatGatewayUpdateTagsStandardV2Sku.json
 */
async function updateNatGatewayWithStandardV2SkuTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.natGateways.updateTags("rg1", "test-natGateway", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateNatGatewayTags();
  await updateNatGatewayWithStandardV2SkuTags();
}

main().catch(console.error);
