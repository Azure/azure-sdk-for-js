// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to acknowledge errors for specified operations in a resource group.
 *
 * @summary acknowledge errors for specified operations in a resource group.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkAcknowledgeOperationErrors_BasicSuccess.json
 */
async function _01AcknowledgeMultipleOperationErrors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkAcknowledgeOperationErrors(
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
 * This sample demonstrates how to acknowledge errors for specified operations in a resource group.
 *
 * @summary acknowledge errors for specified operations in a resource group.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkAcknowledgeOperationErrors_MixedResults.json
 */
async function _02AcknowledgeOperationErrorsWithMixedResults(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkAcknowledgeOperationErrors(
    "example-rg",
    "eastus",
    {
      operationIds: [
        "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa",
        "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb",
        "cccccccc-cccc-cccc-cccc-cccccccccccc",
      ],
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to acknowledge errors for specified operations in a resource group.
 *
 * @summary acknowledge errors for specified operations in a resource group.
 * x-ms-original-file: 2026-10-06-preview/VirtualMachineBulkOperations_BulkAcknowledgeOperationErrors_OperationNotFoundError.json
 */
async function _03AcknowledgeOperationErrorsWithAnUnknownOperationIdResultingInNotFound(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkAcknowledgeOperationErrors(
    "example-rg",
    "eastus",
    { operationIds: ["dddddddd-dddd-dddd-dddd-dddddddddddd"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await _01AcknowledgeMultipleOperationErrors();
  await _02AcknowledgeOperationErrorsWithMixedResults();
  await _03AcknowledgeOperationErrorsWithAnUnknownOperationIdResultingInNotFound();
}

main().catch(console.error);
