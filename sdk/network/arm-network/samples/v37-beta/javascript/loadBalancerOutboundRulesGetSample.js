// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified load balancer outbound rule.
 *
 * @summary gets the specified load balancer outbound rule.
 * x-ms-original-file: 2025-05-01/LoadBalancerOutboundRuleGet.json
 */
async function loadBalancerOutboundRuleGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerOutboundRules.get("testrg", "lb1", "rule1");
  console.log(result);
}

async function main() {
  await loadBalancerOutboundRuleGet();
}

main().catch(console.error);
