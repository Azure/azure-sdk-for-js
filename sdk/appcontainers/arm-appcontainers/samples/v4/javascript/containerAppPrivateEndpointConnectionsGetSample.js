// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the details of a private endpoint connection associated with a Container App.
 *
 * @summary gets the details of a private endpoint connection associated with a Container App.
 * x-ms-original-file: 2026-07-01/ContainerAppPrivateEndpointConnections_Get.json
 */
async function getAPrivateEndpointConnectionByContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "8efdecc5-919e-44eb-b179-915dca89ebf9";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerAppPrivateEndpointConnections.get(
    "examplerg",
    "testcontainerapp0",
    "test-private-endpoint-connection",
  );
  console.log(result);
}

async function main() {
  await getAPrivateEndpointConnectionByContainerApp();
}

main().catch(console.error);
