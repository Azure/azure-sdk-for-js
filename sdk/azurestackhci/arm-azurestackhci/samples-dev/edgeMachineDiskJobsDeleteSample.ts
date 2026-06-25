// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a disk job.
 *
 * @summary delete a disk job.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDiskJobs_Delete.json
 */
async function edgeMachineDiskJobsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineDiskJobs.delete("test-rg", "EdgeMachine01", "disk-001", "CreateVolume");
}

async function main(): Promise<void> {
  await edgeMachineDiskJobsDelete();
}

main().catch(console.error);
