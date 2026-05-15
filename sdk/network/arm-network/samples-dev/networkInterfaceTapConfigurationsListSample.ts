// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get all Tap configurations in a network interface.
 *
 * @summary get all Tap configurations in a network interface.
 * x-ms-original-file: 2025-05-01/NetworkInterfaceTapConfigurationList.json
 */
async function listVirtualNetworkTapConfigurations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkInterfaceTapConfigurations.list("testrg", "mynic")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listVirtualNetworkTapConfigurations();
}

main().catch(console.error);
