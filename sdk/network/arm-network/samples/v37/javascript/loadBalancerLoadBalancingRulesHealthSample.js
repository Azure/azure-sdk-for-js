// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get health details of a load balancing rule.
 *
 * @summary get health details of a load balancing rule.
 * x-ms-original-file: 2025-05-01/LoadBalancerHealth.json
 */
async function queryLoadBalancingRuleHealth() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerLoadBalancingRules.health("rg1", "lb1", "rulelb");
  console.log(result);
}

async function main() {
  await queryLoadBalancingRuleHealth();
}

main().catch(console.error);
