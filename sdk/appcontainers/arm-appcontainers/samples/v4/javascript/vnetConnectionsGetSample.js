// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of a VnetConnection.
 *
 * @summary get the properties of a VnetConnection.
 * x-ms-original-file: 2026-07-01/VnetConnections_Get.json
 */
async function getAVnetConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.vnetConnections.get("myRg", "testgroup", "myVnetConnection");
  console.log(result);
}

async function main() {
  await getAVnetConnection();
}

main().catch(console.error);
