// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Get health details of a load balancing rule.
 *
 * @summary Get health details of a load balancing rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/LoadBalancerHealth.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function queryLoadBalancingRuleHealth(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const groupName = "rg1";
  const loadBalancerName = "lb1";
  const loadBalancingRuleName = "rulelb";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerLoadBalancingRules.beginHealthAndWait(
    groupName,
    loadBalancerName,
    loadBalancingRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await queryLoadBalancingRuleHealth();
}

main().catch(console.error);
