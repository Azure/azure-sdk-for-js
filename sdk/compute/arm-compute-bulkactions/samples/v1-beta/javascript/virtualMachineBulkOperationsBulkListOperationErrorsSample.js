// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to bulkListOperationErrors: List bulk operation errors for a resource group
 *
 * @summary bulkListOperationErrors: List bulk operation errors for a resource group
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkListOperationErrors_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkListOperationErrorsExample() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineBulkOperations.bulkListOperationErrors(
    "rgBulkactions",
    "useast2euap",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to bulkListOperationErrors: List bulk operation errors for a resource group
 *
 * @summary bulkListOperationErrors: List bulk operation errors for a resource group
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkListOperationErrors_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkListOperationErrorsMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineBulkOperations.bulkListOperationErrors(
    "rgBulkactions",
    "useast2euap",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineBulkOperationsBulkListOperationErrorsExample();
  await virtualMachineBulkOperationsBulkListOperationErrorsMinimumSetGen();
}

main().catch(console.error);
