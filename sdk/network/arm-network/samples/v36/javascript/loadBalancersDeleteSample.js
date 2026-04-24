// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes the specified load balancer.
 *
 * @summary Deletes the specified load balancer.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LoadBalancerDelete.json
 */
async function deleteLoadBalancer() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const loadBalancerName = "lb";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancers.beginDeleteAndWait(resourceGroupName, loadBalancerName);
  console.log(result);
}

async function main() {
  await deleteLoadBalancer();
}

main().catch(console.error);
