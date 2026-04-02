// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get health details of a load balancing rule.
 *
 * @summary get health details of a load balancing rule.
 * x-ms-original-file: 2025-05-01/LoadBalancerHealth.json
 */
async function queryLoadBalancingRuleHealth(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerLoadBalancingRules.health("rg1", "lb1", "rulelb");
  console.log(result);
}

async function main(): Promise<void> {
  await queryLoadBalancingRuleHealth();
}

main().catch(console.error);
