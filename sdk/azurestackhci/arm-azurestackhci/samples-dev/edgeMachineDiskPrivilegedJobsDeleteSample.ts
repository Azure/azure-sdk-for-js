// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a privileged job.
 *
 * @summary delete a privileged job.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDiskPrivilegedJobs_Delete.json
 */
async function edgeMachineDiskPrivilegedJobsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineDiskPrivilegedJobs.delete(
    "test-rg",
    "EdgeMachine01",
    "disk-001",
    "DeleteVolume",
  );
}

async function main(): Promise<void> {
  await edgeMachineDiskPrivilegedJobsDelete();
}

main().catch(console.error);
