// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-bulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to bulkReimage: Execute reimage operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary bulkReimage: Execute reimage operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-07-06-preview/VirtualMachineBulkOperations_BulkReimage_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsBulkReimageExample(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "1FBA3C66-5C9C-4391-B72F-9F52735FC9F2";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.bulkReimageOperation(
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
      reimageParameters: {
        baseProfile: {
          tempDisk: true,
          exactVersion: "zjmkrnqjmzs",
          osProfile: {
            adminPassword: "<a-password-goes-here>",
            customData: "teyngslcznlxihiitqbul",
          },
        },
        resourceOverrides: [
          {
            resourceId:
              "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
            profile: {
              tempDisk: true,
              exactVersion: "zjmkrnqjmzs",
              osProfile: {
                adminPassword: "<a-password-goes-here>",
                customData: "teyngslcznlxihiitqbul",
              },
            },
          },
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineBulkOperationsBulkReimageExample();
}

main().catch(console.error);
