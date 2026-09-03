// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Container App.
 *
 * @summary delete a Container App.
 * x-ms-original-file: 2025-10-02-preview/ContainerApps_Delete.json
 */
async function deleteContainerApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.containerApps.delete("rg", "testWorkerApp0");
}

async function main() {
  await deleteContainerApp();
}

main().catch(console.error);
