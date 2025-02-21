// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list TrafficController resources by resource group
 *
 * @summary list TrafficController resources by resource group
 * x-ms-original-file: 2025-01-01/TrafficControllersGet.json
 */
async function getTrafficControllers(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.trafficControllerInterface.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTrafficControllers();
}

main().catch(console.error);
