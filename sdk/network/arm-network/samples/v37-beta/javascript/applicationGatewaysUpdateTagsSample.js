// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the specified application gateway tags.
 *
 * @summary updates the specified application gateway tags.
 * x-ms-original-file: 2025-05-01/ApplicationGatewayUpdateTags.json
 */
async function updateApplicationGatewayTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.applicationGateways.updateTags("rg1", "AppGw", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateApplicationGatewayTags();
}

main().catch(console.error);
