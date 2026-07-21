// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to bulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary bulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkHibernate_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkHibernateExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkHibernateOperation(
    "rgBulkactions",
    "useast2euap",
    {
      executionParameters: {
        retryPolicy: { retryCount: 2, retryWindowInMinutes: 19, onFailureAction: "Unknown" },
      },
      resourcesWithContext: {
        resources: [
          {
            resourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
            resourceContext: "hibernateContext",
          },
        ],
      },
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to bulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary bulkHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkHibernate_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkHibernateGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkHibernateOperation(
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
  await virtualMachineBulkOperationsBulkHibernateExample();
  await virtualMachineBulkOperationsBulkHibernateGeneratedByMinimumSetRule();
}

main().catch(console.error);
