// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to start a container app
 *
 * @summary start a container app
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_Start.json
 */
async function startContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.start("rg", "testWorkerApp0");
  console.log(result);
}

async function main() {
  await startContainerApp();
}

main().catch(console.error);
