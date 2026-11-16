// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a network adapter job.
 *
 * @summary delete a network adapter job.
 * x-ms-original-file: 2026-10-01/EdgeMachineNetworkAdapterJobs_Delete.json
 */
async function edgeMachineNetworkAdapterJobsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineNetworkAdapterJobs.delete(
    "test-rg",
    "EdgeMachine01",
    "ethernet0",
    "ApplyConfiguration",
  );
}

async function main() {
  await edgeMachineNetworkAdapterJobsDelete();
}

main().catch(console.error);
