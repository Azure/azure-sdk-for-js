// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhci";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a privileged job.
 *
 * @summary create or update a privileged job.
 * x-ms-original-file: 2026-05-01-preview/EdgeMachineDiskPrivilegedJobs_CreateOrUpdate_DeleteVolume.json
 */
async function edgeMachineDiskPrivilegedJobsCreateOrUpdateDeleteVolume(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineDiskPrivilegedJobs.createOrUpdate(
    "test-rg",
    "EdgeMachine01",
    "disk-001",
    "DeleteVolume",
    {
      properties: {
        jobType: "DeleteVolume",
        deploymentMode: "Deploy",
        volumePath: "/data",
        confirmDeletion: true,
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await edgeMachineDiskPrivilegedJobsCreateOrUpdateDeleteVolume();
}

main().catch(console.error);
