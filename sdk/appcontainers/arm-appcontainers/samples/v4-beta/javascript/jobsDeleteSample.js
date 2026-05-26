// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a Container Apps Job.
 *
 * @summary delete a Container Apps Job.
 * x-ms-original-file: 2025-10-02-preview/Job_Delete.json
 */
async function deleteContainerAppsJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.jobs.delete("rg", "testWorkerContainerAppsJob0");
}

async function main() {
  await deleteContainerAppsJob();
}

main().catch(console.error);
