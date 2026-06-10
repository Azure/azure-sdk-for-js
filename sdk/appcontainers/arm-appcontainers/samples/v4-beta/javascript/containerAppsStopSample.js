// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to stop a container app
 *
 * @summary stop a container app
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_Stop.json
 */
async function stopContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.containerApps.stop("rg", "testWorkerApp0");
  console.log(result);
}

async function main() {
  await stopContainerApp();
}

main().catch(console.error);
