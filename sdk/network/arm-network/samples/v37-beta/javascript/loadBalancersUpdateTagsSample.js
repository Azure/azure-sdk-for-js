// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a load balancer tags.
 *
 * @summary updates a load balancer tags.
 * x-ms-original-file: 2025-05-01/LoadBalancerUpdateTags.json
 */
async function updateLoadBalancerTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.updateTags("rg1", "lb", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateLoadBalancerTags();
}

main().catch(console.error);
