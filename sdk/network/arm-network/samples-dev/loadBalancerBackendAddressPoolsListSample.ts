// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets all the load balancer backed address pools.
 *
 * @summary Gets all the load balancer backed address pools.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/LBBackendAddressPoolListWithBackendAddressesPoolType.json
 */

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function loadBalancerWithBackendAddressPoolContainingBackendAddresses(): Promise<void> {
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
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2024-07-01/examples/LoadBalancerBackendAddressPoolList.json
 */
async function loadBalancerBackendAddressPoolList(): Promise<void> {
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

async function main(): Promise<void> {
  await loadBalancerWithBackendAddressPoolContainingBackendAddresses();
  await loadBalancerBackendAddressPoolList();
}

main().catch(console.error);
