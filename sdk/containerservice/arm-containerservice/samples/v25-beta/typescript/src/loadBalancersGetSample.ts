// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified load balancer.
 *
 * @summary gets the specified load balancer.
 * x-ms-original-file: 2025-10-02-preview/LoadBalancers_Get.json
 */
async function getLoadBalancer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.loadBalancers.get("rg1", "clustername1", "kubernetes");
  console.log(result);
}

async function main(): Promise<void> {
  await getLoadBalancer();
}

main().catch(console.error);
