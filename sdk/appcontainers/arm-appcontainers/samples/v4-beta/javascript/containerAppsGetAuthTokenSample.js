// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get auth token for a container app
 *
 * @summary get auth token for a container app
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_GetAuthToken.json
 */
async function getContainerAppAuthToken() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "651f8027-33e8-4ec4-97b4-f6e9f3dc8744";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.getAuthToken("rg", "testcontainerApp0");
  console.log(result);
}

async function main() {
  await getContainerAppAuthToken();
}

main().catch(console.error);
