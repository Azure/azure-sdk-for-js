// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIClient } from "@azure/arm-appcontainers";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resumes a suspended job
 *
 * @summary resumes a suspended job
 * x-ms-original-file: 2025-10-02-preview/Jobs_Resume.json
 */
async function resumeJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new ContainerAppsAPIClient(credential, subscriptionId);
  const result = await client.jobs.resume("rg", "testcontainerAppsJob0");
  console.log(result);
}

async function main(): Promise<void> {
  await resumeJob();
}

main().catch(console.error);
