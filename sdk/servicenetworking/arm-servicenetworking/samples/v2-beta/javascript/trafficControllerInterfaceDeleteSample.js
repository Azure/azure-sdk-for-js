// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a TrafficController
 *
 * @summary delete a TrafficController
 * x-ms-original-file: 2025-03-01-preview/TrafficControllerDelete.json
 */
async function deleteTrafficController() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.trafficControllerInterface.delete("rg1", "tc1");
}

async function main() {
  await deleteTrafficController();
}

main().catch(console.error);
