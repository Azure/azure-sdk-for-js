// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkCancel_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkCancelExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkCancelOperations(
    "rgBulkactions",
    "useast2euap",
    { operationIds: ["af449548-8e1a-4079-874e-2caa4ff783cc"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkCancel_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkCancelExampleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkCancelOperations(
    "rgBulkactions",
    "useast2euap",
    { operationIds: ["af449548-8e1a-4079-874e-2caa4ff783cc"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineBulkOperationsBulkCancelExample();
  await virtualMachineBulkOperationsBulkCancelExampleGeneratedByMinimumSetRule();
}

main().catch(console.error);
