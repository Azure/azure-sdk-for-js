// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific privileged job.
 *
 * @summary get a specific privileged job.
 * x-ms-original-file: 2026-10-01/EdgeMachineDiskPrivilegedJobs_Get_DeleteVolume.json
 */
async function edgeMachineDiskPrivilegedJobsGetDeleteVolume() {
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

async function main() {
  await edgeMachineDiskPrivilegedJobsGetDeleteVolume();
}

main().catch(console.error);
