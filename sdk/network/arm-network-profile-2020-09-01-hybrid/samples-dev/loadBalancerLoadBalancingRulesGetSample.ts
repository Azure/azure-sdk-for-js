// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the specified load balancer load balancing rule.
 *
 * @summary Gets the specified load balancer load balancing rule.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2018-11-01/examples/LoadBalancerLoadBalancingRuleGet.json
 */

import { NetworkManagementClient } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function loadBalancerLoadBalancingRuleGet(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const loadBalancerName = "lb1";
  const loadBalancingRuleName = "rule1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerLoadBalancingRules.get(
    resourceGroupName,
    loadBalancerName,
    loadBalancingRuleName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await loadBalancerLoadBalancingRuleGet();
}

main().catch(console.error);
