// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets associated load balancer network interfaces.
 *
 * @summary Gets associated load balancer network interfaces.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LoadBalancerNetworkInterfaceListSimple.json
 */
async function loadBalancerNetworkInterfaceListSimple() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const loadBalancerName = "lb";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerNetworkInterfaces.list(
    resourceGroupName,
    loadBalancerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets associated load balancer network interfaces.
 *
 * @summary Gets associated load balancer network interfaces.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/LoadBalancerNetworkInterfaceListVmss.json
 */
async function loadBalancerNetworkInterfaceListVmss() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const loadBalancerName = "lb";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.loadBalancerNetworkInterfaces.list(
    resourceGroupName,
    loadBalancerName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await loadBalancerNetworkInterfaceListSimple();
  await loadBalancerNetworkInterfaceListVmss();
}

main().catch(console.error);
