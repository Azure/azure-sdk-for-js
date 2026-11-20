// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operation status for virtual machines in a BulkCreate operation.
 *
 * @summary gets the operation status for virtual machines in a BulkCreate operation.
 * x-ms-original-file: 2026-10-16/BulkCreate_VirtualMachinesGetOperationStatus.json
 */
async function getTheIndividualVirtualMachineResultsForABulkCreateOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkCreate.virtualMachinesGetOperationStatus(
    "rg-bulk-create",
    "eastus",
    "fb5e3fe5-f509-4d7c-8f6a-fe65eeef921e",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getTheIndividualVirtualMachineResultsForABulkCreateOperation();
}

main().catch(console.error);
