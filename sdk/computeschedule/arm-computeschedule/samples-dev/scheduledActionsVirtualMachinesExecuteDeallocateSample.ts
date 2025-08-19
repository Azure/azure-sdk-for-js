// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteDeallocate_MaximumSet_Gen.json
 */

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

async function scheduledActionsVirtualMachinesExecuteDeallocateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteDeallocate(
    "ulufmolrrcxpcelsgffd",
    {
      executionParameters: {
        optimizationPreference: "Cost",
        retryPolicy: { retryCount: 25, retryWindowInMinutes: 4 },
      },
      resources: {
        ids: [
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
        ],
      },
      correlationId: "dsszhmrdsczkv",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteDeallocate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteDeallocateMinimumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteDeallocate(
    "jgmtnwynsoyyasulddbcgfoqzp",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
        ],
      },
      correlationId: "dsszhmrdsczkv",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesExecuteDeallocateMaximumSetGenGeneratedByMaximumSetRule();
  await scheduledActionsVirtualMachinesExecuteDeallocateMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
