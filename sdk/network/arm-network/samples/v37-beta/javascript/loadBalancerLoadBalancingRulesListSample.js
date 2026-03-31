// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the load balancing rules in a load balancer.
 *
 * @summary gets all the load balancing rules in a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerLoadBalancingRuleList.json
 */
async function loadBalancerLoadBalancingRuleList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerLoadBalancingRules.list("testrg", "lb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await loadBalancerLoadBalancingRuleList();
}

main().catch(console.error);
