// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an routing rule.
 *
 * @summary creates or updates an routing rule.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRulePut.json
 */
async function createAnRoutingRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingRules.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    "testRuleCollection",
    "SampleRoutingRule",
    {
      description: "This is Sample Routing Rule",
      destination: { type: "AddressPrefix", destinationAddress: "10.0.0.0/16" },
      nextHop: { nextHopType: "VirtualNetworkGateway" },
    },
  );
  console.log(result);
}

async function main() {
  await createAnRoutingRule();
}

main().catch(console.error);
