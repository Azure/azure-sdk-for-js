// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a disk job.
 *
 * @summary delete a disk job.
 * x-ms-original-file: 2026-10-01/EdgeMachineDiskJobs_Delete.json
 */
async function edgeMachineDiskJobsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineDiskJobs.delete("test-rg", "EdgeMachine01", "disk-001", "CreateVolume");
}

async function main() {
  await edgeMachineDiskJobsDelete();
}

main().catch(console.error);
