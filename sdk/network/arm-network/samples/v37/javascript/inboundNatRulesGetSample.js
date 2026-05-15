// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified load balancer inbound NAT rule.
 *
 * @summary gets the specified load balancer inbound NAT rule.
 * x-ms-original-file: 2025-05-01/InboundNatRuleGet.json
 */
async function inboundNatRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.inboundNatRules.get("testrg", "lb1", "natRule1.1");
  console.log(result);
}

async function main() {
  await inboundNatRuleGet();
}

main().catch(console.error);
