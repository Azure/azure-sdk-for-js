// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific disk job.
 *
 * @summary get a specific disk job.
 * x-ms-original-file: 2026-10-01/EdgeMachineDiskJobs_Get_CreateVolume.json
 */
async function edgeMachineDiskJobsGetCreateVolume() {
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

async function main() {
  await edgeMachineDiskJobsGetCreateVolume();
}

main().catch(console.error);
