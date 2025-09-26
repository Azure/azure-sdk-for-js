// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a job with id in a backup vault
 *
 * @summary gets a job with id in a backup vault
 * x-ms-original-file: 2025-07-01/JobCRUD/GetJob.json
 */
async function getJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.jobs.get(
    "BugBash1",
    "BugBashVaultForCCYv11",
    "3c60cb49-63e8-4b21-b9bd-26277b3fdfae",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getJob();
}

main().catch(console.error);
