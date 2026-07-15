// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates an routing rule.
 *
 * @summary creates or updates an routing rule.
 * x-ms-original-file: 2025-07-01/NetworkManagerRoutingRulePut.json
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

/**
 * This sample demonstrates how to creates or updates an routing rule.
 *
 * @summary creates or updates an routing rule.
 * x-ms-original-file: 2025-07-01/NetworkManagerRoutingRulePutEcmp.json
 */
async function createAnEcmpRoutingRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routingRules.createOrUpdate(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
    "testRuleCollection",
    "SampleEcmpRoutingRule",
    {
      description: "This is a sample ECMP routing rule with multiple next hop IP addresses",
      destination: { type: "AddressPrefix", destinationAddress: "10.0.0.0/16" },
      nextHop: { nextHopType: "VirtualAppliance", nextHopAddress: "10.1.0.4,10.1.0.5,10.1.0.6" },
    },
  );
  console.log(result);
}

async function main() {
  await createAnRoutingRule();
  await createAnEcmpRoutingRule();
}

main().catch(console.error);
