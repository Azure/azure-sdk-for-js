// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to retrieves all the ExpressRouteProviderPorts in a subscription.
 *
 * @summary retrieves all the ExpressRouteProviderPorts in a subscription.
 * x-ms-original-file: 2025-05-01/expressRouteProviderPortList.json
 */
async function expressRouteProviderPortList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.expressRouteProviderPortsLocation.list();
  console.log(result);
}

async function main(): Promise<void> {
  await expressRouteProviderPortList();
}

main().catch(console.error);
