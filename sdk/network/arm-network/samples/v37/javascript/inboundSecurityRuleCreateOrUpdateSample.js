// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the specified Network Virtual Appliance Inbound Security Rules.
 *
 * @summary creates or updates the specified Network Virtual Appliance Inbound Security Rules.
 * x-ms-original-file: 2025-05-01/InboundSecurityRulePut.json
 */
async function createNetworkVirtualApplianceInboundSecurityRules() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.inboundSecurityRule.createOrUpdate("rg1", "nva", "rule1", {
    ruleType: "Permanent",
    rules: [
      {
        name: "inboundRule1",
        appliesOn: ["slbip1"],
        destinationPortRange: 22,
        destinationPortRanges: ["80-100"],
        sourceAddressPrefix: "50.20.121.5/32",
        protocol: "TCP",
      },
    ],
  });
  console.log(result);
}

async function main() {
  await createNetworkVirtualApplianceInboundSecurityRules();
}

main().catch(console.error);
