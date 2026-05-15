// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the ExpressRoutePort resources in the specified subscription.
 *
 * @summary list all the ExpressRoutePort resources in the specified subscription.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortList.json
 */
async function expressRoutePortList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRoutePorts.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await expressRoutePortList();
}

main().catch(console.error);
