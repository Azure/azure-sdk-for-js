// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to suspends a job
 *
 * @summary suspends a job
 * x-ms-original-file: 2025-10-02-preview/Jobs_Suspend.json
 */
async function suspendJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.suspend("rg", "testcontainerAppsJob0");
  console.log(result);
}

async function main(): Promise<void> {
  await suspendJob();
}

main().catch(console.error);
