// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed.
 *
 * @summary cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkCancel_BasicSuccess.json
 */
async function _01CancelMultipleOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkCancelOperations(
    "example-rg",
    "eastus",
    {
      operationIds: [
        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed.
 *
 * @summary cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkCancel_OperationNotFoundError.json
 */
async function _03ResponseWithAnUnknownOperationErrorDuringCancellation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkCancelOperations(
    "example-rg",
    "eastus",
    { operationIds: ["dddddddd-dddd-dddd-dddd-dddddddddddd"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed.
 *
 * @summary cancel one or more Bulk Actions operations by Bulk Action Operation Ids. Cancellation is best effort and work that has already completed is not reversed.
 * x-ms-original-file: 2026-09-06-preview/VirtualMachineBulkOperations_BulkCancel_PartialSuccess.json
 */
async function _02ResponseWithPartiallySuccessfulResult() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkCancelOperations(
    "example-rg",
    "eastus",
    {
      operationIds: [
        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "dddddddd-dddd-dddd-dddd-dddddddddddd",
      ],
    },
  );
  console.log(result);
}

async function main() {
  await _01CancelMultipleOperations();
  await _03ResponseWithAnUnknownOperationErrorDuringCancellation();
  await _02ResponseWithPartiallySuccessfulResult();
}

main().catch(console.error);
