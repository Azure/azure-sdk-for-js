// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all the network manager routing configurations in a network manager, in a paginated format.
 *
 * @summary lists all the network manager routing configurations in a network manager, in a paginated format.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingConfigurationList.json
 */
async function listRoutingConfigurationsInANetworkManager(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkManagerRoutingConfigurations.list(
    "rg1",
    "testNetworkManager",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listRoutingConfigurationsInANetworkManager();
}

main().catch(console.error);
