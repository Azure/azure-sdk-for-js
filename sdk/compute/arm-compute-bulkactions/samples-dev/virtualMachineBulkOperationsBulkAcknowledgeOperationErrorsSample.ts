// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to bulkAcknowledgeOperationErrors: Acknowledge bulk operation errors for a resource group
 *
 * @summary bulkAcknowledgeOperationErrors: Acknowledge bulk operation errors for a resource group
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkAcknowledgeOperationErrors_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkAcknowledgeOperationErrorsExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkAcknowledgeOperationErrors(
    "rgBulkactions",
    "useast2euap",
    { operationIds: ["af449548-8e1a-4079-874e-2caa4ff783cc"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkAcknowledgeOperationErrors: Acknowledge bulk operation errors for a resource group
 *
 * @summary bulkAcknowledgeOperationErrors: Acknowledge bulk operation errors for a resource group
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkAcknowledgeOperationErrors_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkAcknowledgeOperationErrorsMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkAcknowledgeOperationErrors(
    "rgBulkactions",
    "useast2euap",
    { operationIds: ["af449548-8e1a-4079-874e-2caa4ff783cc"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineBulkOperationsBulkAcknowledgeOperationErrorsExample();
  await virtualMachineBulkOperationsBulkAcknowledgeOperationErrorsMinimumSetGen();
}

main().catch(console.error);
