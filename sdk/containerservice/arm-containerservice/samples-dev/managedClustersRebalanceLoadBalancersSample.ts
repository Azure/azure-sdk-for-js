// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Rebalance nodes across specific load balancers.
 *
 * @summary Rebalance nodes across specific load balancers.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-05-02-preview/examples/LoadBalancers_Rebalance.json
 */

import type {
  RebalanceLoadBalancersRequestBody} from "@azure/arm-containerservice";
import {
  ContainerServiceClient,
} from "@azure/arm-containerservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listAgentPoolsByManagedCluster(): Promise<void> {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const parameters: RebalanceLoadBalancersRequestBody = {
    loadBalancerNames: ["kubernetes"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result =
    await client.managedClusters.beginRebalanceLoadBalancersAndWait(
      resourceGroupName,
      resourceName,
      parameters,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await listAgentPoolsByManagedCluster();
}

main().catch(console.error);
