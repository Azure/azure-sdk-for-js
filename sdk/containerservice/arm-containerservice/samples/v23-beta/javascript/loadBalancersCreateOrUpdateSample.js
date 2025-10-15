// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Creates or updates a load balancer in the specified managed cluster.
 *
 * @summary Creates or updates a load balancer in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/LoadBalancers_Create_Or_Update.json
 */
async function createOrUpdateALoadBalancer() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const loadBalancerName = "kubernetes";
  const parameters = {
    allowServicePlacement: true,
    primaryAgentPoolName: "agentpool1",
  };
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const result = await client.loadBalancers.createOrUpdate(
    resourceGroupName,
    resourceName,
    loadBalancerName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateALoadBalancer();
}

main().catch(console.error);
