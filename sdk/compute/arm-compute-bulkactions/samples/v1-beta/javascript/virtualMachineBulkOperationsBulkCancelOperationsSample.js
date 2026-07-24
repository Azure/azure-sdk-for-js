// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkCancel_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkCancelGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkCancelOperations(
    "myResourceGroup",
    "eastus2euap",
    { operationIds: ["a1b2c3d4-e5f6-7890-abcd-ef0123456789"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary bulkCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkCancel_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkCancelGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkCancelOperations(
    "myResourceGroup",
    "eastus2euap",
    { operationIds: ["a1b2c3d4-e5f6-7890-abcd-ef0123456789"] },
  );
  console.log(result);
}

async function main() {
  await virtualMachineBulkOperationsBulkCancelGeneratedByMaximumSetRule();
  await virtualMachineBulkOperationsBulkCancelGeneratedByMinimumSetRule();
}

main().catch(console.error);
