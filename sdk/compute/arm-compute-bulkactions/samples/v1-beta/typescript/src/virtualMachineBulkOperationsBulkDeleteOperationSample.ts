// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to bulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary bulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkDelete_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkDeleteExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkDeleteOperation(
    "rgBulkactions",
    "useast2euap",
    {
      executionParameters: {
        retryPolicy: { retryCount: 2, retryWindowInMinutes: 19, onFailureAction: "Unknown" },
      },
      resources: {
        ids: [
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
        ],
      },
      forceDeletion: true,
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary bulkDelete: Execute delete operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkDelete_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkDeleteGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkDeleteOperation(
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

async function main(): Promise<void> {
  await virtualMachineBulkOperationsBulkDeleteExample();
  await virtualMachineBulkOperationsBulkDeleteGeneratedByMinimumSetRule();
}

main().catch(console.error);
