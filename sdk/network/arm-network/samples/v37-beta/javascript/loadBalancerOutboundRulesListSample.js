// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the outbound rules in a load balancer.
 *
 * @summary gets all the outbound rules in a load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerOutboundRuleList.json
 */
async function loadBalancerOutboundRuleList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerOutboundRules.list("testrg", "lb1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await loadBalancerOutboundRuleList();
}

main().catch(console.error);
