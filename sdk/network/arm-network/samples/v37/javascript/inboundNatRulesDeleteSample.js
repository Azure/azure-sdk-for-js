// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified load balancer inbound NAT rule.
 *
 * @summary deletes the specified load balancer inbound NAT rule.
 * x-ms-original-file: 2025-05-01/InboundNatRuleDelete.json
 */
async function inboundNatRuleDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.inboundNatRules.delete("testrg", "lb1", "natRule1.1");
}

async function main() {
  await inboundNatRuleDelete();
}

main().catch(console.error);
