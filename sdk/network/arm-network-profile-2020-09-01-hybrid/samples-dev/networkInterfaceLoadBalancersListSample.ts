// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to List all load balancers in a network interface.
 *
 * @summary List all load balancers in a network interface.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/stable/2018-11-01/examples/NetworkInterfaceLoadBalancerList.json
 */

import { NetworkManagementClient } from "@azure/arm-network-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function networkInterfaceLoadBalancerList(): Promise<void> {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "testrg";
  const networkInterfaceName = "nic1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaceLoadBalancers.list(
    resourceGroupName,
    networkInterfaceName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await networkInterfaceLoadBalancerList();
}

main().catch(console.error);
