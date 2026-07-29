// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Container Apps Job.
 *
 * @summary delete a Container Apps Job.
 * x-ms-original-file: 2025-10-02-preview/Job_Delete.json
 */
async function deleteContainerAppsJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  await client.jobs.delete("rg", "testWorkerContainerAppsJob0");
}

async function main(): Promise<void> {
  await deleteContainerAppsJob();
}

main().catch(console.error);
