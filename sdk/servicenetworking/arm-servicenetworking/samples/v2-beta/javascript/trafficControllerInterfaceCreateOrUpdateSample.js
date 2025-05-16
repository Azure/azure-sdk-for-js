// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a TrafficController
 *
 * @summary create a TrafficController
 * x-ms-original-file: 2025-03-01-preview/TrafficControllerPut.json
 */
async function putTrafficController() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.trafficControllerInterface.createOrUpdate("rg1", "tc1", {
    location: "NorthCentralUS",
    tags: { key1: "value1" },
  });
  console.log(result);
}

async function main() {
  await putTrafficController();
}

main().catch(console.error);
