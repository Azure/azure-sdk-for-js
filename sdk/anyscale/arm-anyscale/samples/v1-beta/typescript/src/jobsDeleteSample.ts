// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a job.
 *
 * @summary deletes a job.
 * x-ms-original-file: 2026-09-01/Jobs_Delete.json
 */
async function jobsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.jobs.delete("rganyscale", "testcloud", "testproject", "testjob");
}

async function main(): Promise<void> {
  await jobsDelete();
}

main().catch(console.error);
