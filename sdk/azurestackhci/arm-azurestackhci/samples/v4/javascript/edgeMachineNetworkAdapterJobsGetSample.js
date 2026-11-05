// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific network adapter job.
 *
 * @summary get a specific network adapter job.
 * x-ms-original-file: 2026-10-01/EdgeMachineNetworkAdapterJobs_Get.json
 */
async function edgeMachineNetworkAdapterJobsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineNetworkAdapterJobs.get(
    "test-rg",
    "EdgeMachine01",
    "ethernet0",
    "ApplyConfiguration",
  );
  console.log(result);
}

async function main() {
  await edgeMachineNetworkAdapterJobsGet();
}

main().catch(console.error);
