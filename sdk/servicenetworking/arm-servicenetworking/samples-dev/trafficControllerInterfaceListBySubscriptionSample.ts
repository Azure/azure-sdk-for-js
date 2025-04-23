// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceNetworkingManagementClient } from "@azure/arm-servicenetworking";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list TrafficController resources by subscription ID
 *
 * @summary list TrafficController resources by subscription ID
 * x-ms-original-file: 2025-03-01-preview/TrafficControllersGetList.json
 */
async function getTrafficControllersList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trafficControllerInterface.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTrafficControllersList();
}

main().catch(console.error);
