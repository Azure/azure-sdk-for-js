// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates a loadBalancer tags.
 *
 * @summary updates a loadBalancer tags.
 * x-ms-original-file: 2026-04-01-preview/LoadBalancers_UpdateTags.json
 */
async function updateLoadBalancersTags() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.updateTags("testrg", "test-lb", {
    tags: { tag1: "value1", tag2: "value2" },
  });
  console.log(result);
}

async function main() {
  await updateLoadBalancersTags();
}

main().catch(console.error);
