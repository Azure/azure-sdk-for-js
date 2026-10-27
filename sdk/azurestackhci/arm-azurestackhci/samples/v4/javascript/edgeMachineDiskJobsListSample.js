// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all jobs for a disk.
 *
 * @summary list all jobs for a disk.
 * x-ms-original-file: 2026-10-01/EdgeMachineDiskJobs_List.json
 */
async function edgeMachineDiskJobsList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.edgeMachineDiskJobs.list(
    "test-rg",
    "EdgeMachine01",
    "disk-001",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await edgeMachineDiskJobsList();
}

main().catch(console.error);
