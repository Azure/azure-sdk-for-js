// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-bulkactions");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to bulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary bulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkStart_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkStartGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkStartOperation(
    "myResourceGroup",
    "eastus2euap",
    {
      executionParameters: {
        retryPolicy: { retryCount: 2, retryWindowInMinutes: 20, onFailureAction: "Unknown" },
      },
      resources: {
        ids: [
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary bulkStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-06-06/VirtualMachineBulkOperations_BulkStart_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkStartGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkStartOperation(
    "myResourceGroup",
    "eastus2euap",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
        ],
      },
    },
  );
  console.log(result);
}

async function main() {
  await virtualMachineBulkOperationsBulkStartGeneratedByMaximumSetRule();
  await virtualMachineBulkOperationsBulkStartGeneratedByMinimumSetRule();
}

main().catch(console.error);
