// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets associated load balancer network interfaces.
 *
 * @summary gets associated load balancer network interfaces.
 * x-ms-original-file: 2025-05-01/LoadBalancerNetworkInterfaceListSimple.json
 */
async function loadBalancerNetworkInterfaceListSimple() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerNetworkInterfaces.list("testrg", "lb")) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets associated load balancer network interfaces.
 *
 * @summary gets associated load balancer network interfaces.
 * x-ms-original-file: 2025-05-01/LoadBalancerNetworkInterfaceListVmss.json
 */
async function loadBalancerNetworkInterfaceListVmss() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerNetworkInterfaces.list("testrg", "lb")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await loadBalancerNetworkInterfaceListSimple();
  await loadBalancerNetworkInterfaceListVmss();
}

main().catch(console.error);
