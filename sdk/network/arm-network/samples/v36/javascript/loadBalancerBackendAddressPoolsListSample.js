// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets all the load balancer backed address pools.
 *
 * @summary Gets all the load balancer backed address pools.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LBBackendAddressPoolListWithBackendAddressesPoolType.json
 */
async function loadBalancerWithBackendAddressPoolContainingBackendAddresses() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const loadBalancerName = "lb";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerBackendAddressPools.list(
    resourceGroupName,
    loadBalancerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets all the load balancer backed address pools.
 *
 * @summary Gets all the load balancer backed address pools.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LoadBalancerBackendAddressPoolList.json
 */
async function loadBalancerBackendAddressPoolList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const loadBalancerName = "lb";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerBackendAddressPools.list(
    resourceGroupName,
    loadBalancerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await loadBalancerWithBackendAddressPoolContainingBackendAddresses();
  await loadBalancerBackendAddressPoolList();
}

main().catch(console.error);
