// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a load balancer in the specified managed cluster.
 *
 * @summary creates or updates a load balancer in the specified managed cluster.
 * x-ms-original-file: 2025-10-02-preview/LoadBalancers_Create_Or_Update.json
 */
async function createOrUpdateALoadBalancer() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate("rg1", "clustername1", "kubernetes", {
    allowServicePlacement: true,
    primaryAgentPoolName: "agentpool1",
  });
  console.log(result);
}

async function main() {
  await createOrUpdateALoadBalancer();
}

main().catch(console.error);
