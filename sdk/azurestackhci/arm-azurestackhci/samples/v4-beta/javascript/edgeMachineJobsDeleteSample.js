// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a EdgeMachineJob
 *
 * @summary delete a EdgeMachineJob
 * x-ms-original-file: 2025-12-01-preview/EdgeMachineJobs_Delete_MaximumSet_Gen.json
 */
async function edgeMachineJobsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineJobs.delete("ArcInstance-rg", "machine1", "triggerLogCollection");
}

async function main() {
  await edgeMachineJobsDeleteMaximumSet();
}

main().catch(console.error);
