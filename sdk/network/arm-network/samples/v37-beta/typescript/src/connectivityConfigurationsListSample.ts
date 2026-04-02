// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the network manager connectivity configuration in a specified network manager.
 *
 * @summary lists all the network manager connectivity configuration in a specified network manager.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectivityConfigurationList.json
 */
async function connectivityConfigurationsList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.connectivityConfigurations.list(
    "myResourceGroup",
    "testNetworkManager",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await connectivityConfigurationsList();
}

main().catch(console.error);
