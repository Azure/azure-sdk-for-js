// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the load balancer backed address pools.
 *
 * @summary gets all the load balancer backed address pools.
 * x-ms-original-file: 2025-05-01/LBBackendAddressPoolListWithBackendAddressesPoolType.json
 */
async function loadBalancerWithBackendAddressPoolContainingBackendAddresses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerBackendAddressPools.list("testrg", "lb")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets all the load balancer backed address pools.
 *
 * @summary gets all the load balancer backed address pools.
 * x-ms-original-file: 2025-05-01/LoadBalancerBackendAddressPoolList.json
 */
async function loadBalancerBackendAddressPoolList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerBackendAddressPools.list("testrg", "lb")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await loadBalancerWithBackendAddressPoolContainingBackendAddresses();
  await loadBalancerBackendAddressPoolList();
}

main().catch(console.error);
