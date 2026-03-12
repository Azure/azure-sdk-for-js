// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Updates a load balancer tags.
 *
 * @summary Updates a load balancer tags.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2018-11-01/examples/LoadBalancerUpdateTags.json
 */

import type { TagsObject } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { NetworkManagementClient } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function updateLoadBalancerTags(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const loadBalancerName = "lb";
  const parameters: TagsObject = { tags: { tag1: "value1", tag2: "value2" } };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.beginUpdateTagsAndWait(
    resourceGroupName,
    loadBalancerName,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateLoadBalancerTags();
}

main().catch(console.error);
