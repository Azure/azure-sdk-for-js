// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the load balancers in a subscription.
 *
 * @summary gets all the load balancers in a subscription.
 * x-ms-original-file: 2025-05-01/LoadBalancerListAll.json
 */
async function listAllLoadBalancers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancers.listAll()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listAllLoadBalancers();
}

main().catch(console.error);
