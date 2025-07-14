// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list TrafficController resources by subscription ID
 *
 * @summary list TrafficController resources by subscription ID
 * x-ms-original-file: 2025-03-01-preview/TrafficControllersGetList.json
 */
async function getTrafficControllersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trafficControllerInterface.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTrafficControllersList();
}

main().catch(console.error);
