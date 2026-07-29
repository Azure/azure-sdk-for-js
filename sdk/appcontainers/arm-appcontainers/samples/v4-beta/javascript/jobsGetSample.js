// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerAppsAPIClient } = require("@azure/arm-appcontainers");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the properties of a Container Apps Job.
 *
 * @summary get the properties of a Container Apps Job.
 * x-ms-original-file: 2025-10-02-preview/Job_Get.json
 */
async function getContainerAppsJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.get("rg", "testcontainerAppsJob0");
  console.log(result);
}

async function main() {
  await getContainerAppsJob();
}

main().catch(console.error);
