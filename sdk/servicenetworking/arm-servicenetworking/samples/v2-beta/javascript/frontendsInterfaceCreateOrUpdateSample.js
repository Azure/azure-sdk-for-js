// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create a Frontend
 *
 * @summary create a Frontend
 * x-ms-original-file: 2025-03-01-preview/FrontendPut.json
 */
async function putFrontend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.frontendsInterface.createOrUpdate("rg1", "tc1", "fe1", {
    location: "NorthCentralUS",
    properties: {},
  });
  console.log(result);
}

async function main() {
  await putFrontend();
}

main().catch(console.error);
