// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list Frontend resources by TrafficController
 *
 * @summary list Frontend resources by TrafficController
 * x-ms-original-file: 2025-03-01-preview/FrontendsGet.json
 */
async function getFrontends() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.frontendsInterface.listByTrafficController("rg1", "tc1")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getFrontends();
}

main().catch(console.error);
