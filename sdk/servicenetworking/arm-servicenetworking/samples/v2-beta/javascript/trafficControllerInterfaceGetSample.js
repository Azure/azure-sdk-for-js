// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a TrafficController
 *
 * @summary get a TrafficController
 * x-ms-original-file: 2025-03-01-preview/TrafficControllerGet.json
 */
async function getTrafficController() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.trafficControllerInterface.get("rg1", "tc1");
  console.log(result);
}

async function main() {
  await getTrafficController();
}

main().catch(console.error);
