// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operation status for virtual machines in a BulkCreate operation.
 *
 * @summary gets the operation status for virtual machines in a BulkCreate operation.
 * x-ms-original-file: 2026-09-06-preview/BulkCreate_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json
 */
async function bulkCreateVirtualMachinesGetOperationStatusMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "700935bc-adf2-4176-b9ad-c571731c09fc";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkCreate.virtualMachinesGetOperationStatus(
    "local-test-rg",
    "eastus",
    "00000000-0000-0000-0000-000000000102",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await bulkCreateVirtualMachinesGetOperationStatusMaximumSet();
}

main().catch(console.error);
