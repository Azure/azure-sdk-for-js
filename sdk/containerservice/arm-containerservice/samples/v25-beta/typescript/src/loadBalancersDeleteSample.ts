// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceClient } from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a load balancer in the specified managed cluster.
 *
 * @summary deletes a load balancer in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/LoadBalancers_Delete.json
 */
async function deleteALoadBalancer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.loadBalancers.delete("rg1", "clustername1", "kubernetes");
}

async function main(): Promise<void> {
  await deleteALoadBalancer();
}

main().catch(console.error);
