// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the current status of one or more operations identified by their Bulk Action Operation Ids.
 *
 * @summary get the current status of one or more operations identified by their Bulk Action Operation Ids.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_BasicSuccess.json
 */
async function _01GetTheStatusOfSuccessfullyCompletedOperations() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkGetOperationsStatus(
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
 * This sample demonstrates how to get the current status of one or more operations identified by their Bulk Action Operation Ids.
 *
 * @summary get the current status of one or more operations identified by their Bulk Action Operation Ids.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_DeallocateFallbackAfterHibernateFail.json
 */
async function _04ResponseWithSuccessfulDeallocationFallbackAfterHibernationFails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkGetOperationsStatus(
    "example-rg",
    "eastus",
    { operationIds: ["ffffffff-ffff-ffff-ffff-ffffffffffff"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the current status of one or more operations identified by their Bulk Action Operation Ids.
 *
 * @summary get the current status of one or more operations identified by their Bulk Action Operation Ids.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_DeallocateFallbackFailedAfterHibernateFail.json
 */
async function _05ResponseWithFailedDeallocationFallbackAfterHibernationFails() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkGetOperationsStatus(
    "example-rg",
    "eastus",
    { operationIds: ["7f3c98a4-64b8-4d6a-b215-890c16d27643"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the current status of one or more operations identified by their Bulk Action Operation Ids.
 *
 * @summary get the current status of one or more operations identified by their Bulk Action Operation Ids.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_FailedOperation.json
 */
async function _02GetTheStatusOfAFailedOperation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkGetOperationsStatus(
    "example-rg",
    "eastus",
    { operationIds: ["e69c80d2-4f31-46ac-9e35-c6a7cb63fe12"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get the current status of one or more operations identified by their Bulk Action Operation Ids.
 *
 * @summary get the current status of one or more operations identified by their Bulk Action Operation Ids.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkGetOperationsStatus_OperationNotFoundError.json
 */
async function _03ResponseWithAnOperationNotFoundError() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkGetOperationsStatus(
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
  await _01GetTheStatusOfSuccessfullyCompletedOperations();
  await _04ResponseWithSuccessfulDeallocationFallbackAfterHibernationFails();
  await _05ResponseWithFailedDeallocationFallbackAfterHibernationFails();
  await _02GetTheStatusOfAFailedOperation();
  await _03ResponseWithAnOperationNotFoundError();
}

main().catch(console.error);
