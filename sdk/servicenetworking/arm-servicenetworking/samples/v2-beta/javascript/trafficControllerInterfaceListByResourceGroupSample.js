// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list TrafficController resources by resource group
 *
 * @summary list TrafficController resources by resource group
 * x-ms-original-file: 2025-03-01-preview/TrafficControllersGet.json
 */
async function getTrafficControllers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.trafficControllerInterface.listByResourceGroup("rg1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTrafficControllers();
}

main().catch(console.error);
