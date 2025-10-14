// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservice");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets a list of load balancers in the specified managed cluster.
 *
 * @summary Gets a list of load balancers in the specified managed cluster.
 * x-ms-original-file: specification/containerservice/resource-manager/Microsoft.ContainerService/aks/preview/2025-07-02-preview/examples/LoadBalancers_List.json
 */
async function listLoadBalancersByManagedCluster() {
  const subscriptionId =
    process.env["CONTAINERSERVICE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["CONTAINERSERVICE_RESOURCE_GROUP"] || "rg1";
  const resourceName = "clustername1";
  const credential = new DefaultAzureCredential();
  const client = new ContainerServiceClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancers.listByManagedCluster(
    resourceGroupName,
    resourceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listLoadBalancersByManagedCluster();
}

main().catch(console.error);
