// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets load balancer backend address pool.
 *
 * @summary gets load balancer backend address pool.
 * x-ms-original-file: 2025-05-01/LBBackendAddressPoolWithBackendAddressesGet.json
 */
async function loadBalancerWithBackendAddressPoolWithBackendAddresses() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerBackendAddressPools.get("testrg", "lb", "backend");
  console.log(result);
}

/**
 * This sample demonstrates how to gets load balancer backend address pool.
 *
 * @summary gets load balancer backend address pool.
 * x-ms-original-file: 2025-05-01/LoadBalancerBackendAddressPoolGet.json
 */
async function loadBalancerBackendAddressPoolGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.loadBalancerBackendAddressPools.get("testrg", "lb", "backend");
  console.log(result);
}

async function main() {
  await loadBalancerWithBackendAddressPoolWithBackendAddresses();
  await loadBalancerBackendAddressPoolGet();
}

main().catch(console.error);
