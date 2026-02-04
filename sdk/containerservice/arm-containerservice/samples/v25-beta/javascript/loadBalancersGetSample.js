// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified load balancer.
 *
 * @summary gets the specified load balancer.
 * x-ms-original-file: 2025-10-02-preview/LoadBalancers_Get.json
 */
async function getLoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.loadBalancers.get("rg1", "clustername1", "kubernetes");
  console.log(result);
}

async function main() {
  await getLoadBalancer();
}

main().catch(console.error);
