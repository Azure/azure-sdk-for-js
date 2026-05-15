// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkManagementClient } from "@azure/arm-network";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all the ExpressRoutePort resources in the specified resource group.
 *
 * @summary list all the ExpressRoutePort resources in the specified resource group.
 * x-ms-original-file: 2025-05-01/ExpressRoutePortListByResourceGroup.json
 */
async function expressRoutePortListByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.expressRoutePorts.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await expressRoutePortListByResourceGroup();
}

main().catch(console.error);
