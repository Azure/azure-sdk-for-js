// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates virtual wan p2s vpn gateway tags.
 *
 * @summary updates virtual wan p2s vpn gateway tags.
 * x-ms-original-file: 2025-05-01/P2SVpnGatewayUpdateTags.json
 */
async function p2SVpnGatewayUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.updateTags("rg1", "p2sVpnGateway1", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await p2SVpnGatewayUpdate();
}

main().catch(console.error);
