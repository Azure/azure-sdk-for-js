// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a privileged job.
 *
 * @summary delete a privileged job.
 * x-ms-original-file: 2026-10-01/EdgeMachineDiskPrivilegedJobs_Delete.json
 */
async function edgeMachineDiskPrivilegedJobsDelete() {
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

async function main() {
  await edgeMachineDiskPrivilegedJobsDelete();
}

main().catch(console.error);
