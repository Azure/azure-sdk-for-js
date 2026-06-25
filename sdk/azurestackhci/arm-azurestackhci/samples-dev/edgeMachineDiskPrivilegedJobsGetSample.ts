// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific privileged job.
 *
 * @summary get a specific privileged job.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDiskPrivilegedJobs_Get_DeleteVolume.json
 */
async function edgeMachineDiskPrivilegedJobsGetDeleteVolume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDiskPrivilegedJobs.get(
    "test-rg",
    "EdgeMachine01",
    "disk-001",
    "DeleteVolume",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineDiskPrivilegedJobsGetDeleteVolume();
}

main().catch(console.error);
