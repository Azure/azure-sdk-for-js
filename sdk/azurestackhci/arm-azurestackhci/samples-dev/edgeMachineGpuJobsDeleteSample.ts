// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a specific GPU Job on an Edge Machine GPU.
 *
 * @summary delete a specific GPU Job on an Edge Machine GPU.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineGpuJobs_Delete_MaximumSet.json
 */
async function edgeMachineGpuJobsDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineGpuJobs.delete(
    "ArcInstance-rg",
    "machine1",
    "default",
    "CreatePartition",
  );
}

async function main(): Promise<void> {
  await edgeMachineGpuJobsDeleteMaximumSet();
}

main().catch(console.error);
