// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to rebalance nodes across specific load balancers.
 *
 * @summary rebalance nodes across specific load balancers.
 * x-ms-original-file: 2026-01-02-preview/LoadBalancers_Rebalance.json
 */
async function rebalanceLoadBalancersOfAManagedCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.managedClusters.rebalanceLoadBalancers("rg1", "clustername1", {
    loadBalancerNames: ["kubernetes"],
  });
}

async function main() {
  await rebalanceLoadBalancersOfAManagedCluster();
}

main().catch(console.error);
