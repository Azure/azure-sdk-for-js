// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a Frontend
 *
 * @summary update a Frontend
 * x-ms-original-file: 2025-03-01-preview/FrontendPatch.json
 */
async function updateFrontend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.frontendsInterface.update("rg1", "tc1", "fe1", {});
  console.log(result);
}

async function main() {
  await updateFrontend();
}

main().catch(console.error);
