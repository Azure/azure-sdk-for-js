// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a load balancer in the specified managed cluster.
 *
 * @summary deletes a load balancer in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/LoadBalancers_Delete.json
 */
async function deleteALoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.loadBalancers.delete("rg1", "clustername1", "kubernetes");
}

async function main() {
  await deleteALoadBalancer();
}

main().catch(console.error);
