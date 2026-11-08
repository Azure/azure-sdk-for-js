// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list recent errors for operations in a resource group.
 *
 * @summary list recent errors for operations in a resource group.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkListOperationErrors_BasicSuccess.json
 */
async function _01ListRecentFailedOperationErrors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineBulkOperations.bulkListOperationErrors(
    "example-rg",
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list recent errors for operations in a resource group.
 *
 * @summary list recent errors for operations in a resource group.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkListOperationErrors_InvalidLookbackWindowError.json
 */
async function _03ResponseWithAnInvalidLookbackWindowError(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineBulkOperations.bulkListOperationErrors(
    "example-rg",
    "eastus",
    { lookbackInMinutes: 0 },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list recent errors for operations in a resource group.
 *
 * @summary list recent errors for operations in a resource group.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkListOperationErrors_PaginatedSuccess.json
 */
async function _02ListFailedOperationErrorsWithPaginatedResponse(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineBulkOperations.bulkListOperationErrors(
    "example-rg",
    "eastus",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await _01ListRecentFailedOperationErrors();
  await _03ResponseWithAnInvalidLookbackWindowError();
  await _02ListFailedOperationErrorsWithPaginatedResponse();
}

main().catch(console.error);
