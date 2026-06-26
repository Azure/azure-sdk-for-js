// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a disk job.
 *
 * @summary create or update a disk job.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDiskJobs_CreateOrUpdate_CreateVolume.json
 */
async function edgeMachineDiskJobsCreateOrUpdateCreateVolume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDiskJobs.createOrUpdate(
    "test-rg",
    "EdgeMachine01",
    "disk-001",
    "CreateVolume",
    {
      properties: {
        jobType: "CreateVolume",
        deploymentMode: "Deploy",
        sizeInBytes: "107374182400",
        path: "/data",
        fileSystem: "ext4",
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineDiskJobsCreateOrUpdateCreateVolume();
}

main().catch(console.error);
