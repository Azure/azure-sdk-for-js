// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified load balancer load balancing rule.
 *
 * @summary gets the specified load balancer load balancing rule.
 * x-ms-original-file: 2025-05-01/LoadBalancerLoadBalancingRuleGet.json
 */
async function loadBalancerLoadBalancingRuleGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerLoadBalancingRules.get("testrg", "lb1", "rule1");
  console.log(result);
}

async function main(): Promise<void> {
  await loadBalancerLoadBalancingRuleGet();
}

main().catch(console.error);
