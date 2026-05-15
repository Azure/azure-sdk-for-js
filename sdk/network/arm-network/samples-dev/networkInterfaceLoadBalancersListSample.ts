// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all load balancers in a network interface.
 *
 * @summary list all load balancers in a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceLoadBalancerList.json
 */
async function networkInterfaceLoadBalancerList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaceLoadBalancers.list("testrg", "nic1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkInterfaceLoadBalancerList();
}

main().catch(console.error);
