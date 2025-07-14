// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Frontend
 *
 * @summary delete a Frontend
 * x-ms-original-file: 2025-03-01-preview/FrontendDelete.json
 */
async function deleteFrontend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  await client.frontendsInterface.delete("rg1", "tc1", "fe1");
}

async function main() {
  await deleteFrontend();
}

main().catch(console.error);
