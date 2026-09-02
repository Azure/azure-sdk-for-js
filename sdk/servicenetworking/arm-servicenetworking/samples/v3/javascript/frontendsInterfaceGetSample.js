// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ServiceNetworkingManagementClient } = require("@azure/arm-servicenetworking");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a Frontend
 *
 * @summary get a Frontend
 * x-ms-original-file: 2026-03-01/FrontendGet.json
 */
async function getFrontend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.frontendsInterface.get("rg1", "tc1", "fe1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a Frontend
 *
 * @summary get a Frontend
 * x-ms-original-file: 2026-03-01/PrivateFrontendGet.json
 */
async function getPrivateFrontend() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ServiceNetworkingManagementClient(credential, subscriptionId);
  const result = await client.frontendsInterface.get("rg1", "tc1", "pfe1");
  console.log(result);
}

async function main() {
  await getFrontend();
  await getPrivateFrontend();
}

main().catch(console.error);
