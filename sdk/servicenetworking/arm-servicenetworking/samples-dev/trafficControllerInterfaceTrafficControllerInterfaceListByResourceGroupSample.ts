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
async function getTrafficControllers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(
    credential,
    subscriptionId,
  );
  const resArray = new Array();
  for await (let item of client.trafficControllerInterface.TrafficControllerInterface_listByResourceGroup(
    "rg1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  getTrafficControllers();
}

main().catch(console.error);
