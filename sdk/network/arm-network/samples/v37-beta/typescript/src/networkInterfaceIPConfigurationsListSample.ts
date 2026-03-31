// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all ip configurations in a network interface.
 *
 * @summary get all ip configurations in a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceIPConfigurationList.json
 */
async function networkInterfaceIPConfigurationList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaceIPConfigurations.list("testrg", "nic1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await networkInterfaceIPConfigurationList();
}

main().catch(console.error);
