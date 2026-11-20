// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the operation status for virtual machines in a BulkCreateCustom operation.
 *
 * @summary gets the operation status for virtual machines in a BulkCreateCustom operation.
 * x-ms-original-file: 2026-10-16/BulkCreateCustom_VirtualMachinesGetOperationStatus.json
 */
async function getTheIndividualVirtualMachineResultsForABulkCreateCustomOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "57018409-63ae-4ec4-91ef-57bafe128d74";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.bulkCreateCustom.virtualMachinesGetOperationStatus(
    "rg-bulk-create",
    "eastus",
    "a1223fe4-126f-4905-a870-6d53e360cab5",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getTheIndividualVirtualMachineResultsForABulkCreateCustomOperation();
}

main().catch(console.error);
