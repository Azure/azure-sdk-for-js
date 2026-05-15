// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified load balancer.
 *
 * @summary deletes the specified load balancer.
 * x-ms-original-file: 2025-05-01/LoadBalancerDelete.json
 */
async function deleteLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.loadBalancers.delete("rg1", "lb");
}

async function main() {
  await deleteLoadBalancer();
}

main().catch(console.error);
