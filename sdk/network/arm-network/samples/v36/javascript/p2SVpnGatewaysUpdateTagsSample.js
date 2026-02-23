// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Updates virtual wan p2s vpn gateway tags.
 *
 * @summary Updates virtual wan p2s vpn gateway tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/P2SVpnGatewayUpdateTags.json
 */
async function p2SVpnGatewayUpdate() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "p2sVpnGateway1";
  const p2SVpnGatewayParameters = {
    tags: { tag1: "value1", tag2: "value2" },
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.p2SVpnGateways.beginUpdateTagsAndWait(
    resourceGroupName,
    gatewayName,
    p2SVpnGatewayParameters,
  );
  console.log(result);
}

async function main() {
  await p2SVpnGatewayUpdate();
}

main().catch(console.error);
