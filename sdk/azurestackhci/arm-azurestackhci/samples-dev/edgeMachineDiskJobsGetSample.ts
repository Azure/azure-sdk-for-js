// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a specific disk job.
 *
 * @summary get a specific disk job.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDiskJobs_Get_CreateVolume.json
 */
async function edgeMachineDiskJobsGetCreateVolume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDiskJobs.get(
    "test-rg",
    "EdgeMachine01",
    "disk-001",
    "CreateVolume",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineDiskJobsGetCreateVolume();
}

main().catch(console.error);
