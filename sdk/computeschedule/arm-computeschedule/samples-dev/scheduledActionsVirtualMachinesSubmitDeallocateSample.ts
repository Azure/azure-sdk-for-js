// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesSubmitDeallocate_MaximumSet_Gen.json
 */

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

async function scheduledActionsVirtualMachinesSubmitDeallocateMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitDeallocate("smdt", {
    schedule: {
      deadline: "2025-04-15T19:47:04.403Z",
      userRequestDeadline: "2025-04-15T19:47:04.403Z",
      timezone: "qacufsmctpgjozovlsihrzoctatcsj",
      userRequestTimezone: "upnmayfebiadztdktxzq",
      deadlineType: "Unknown",
    },
    executionParameters: {
      optimizationPreference: "Cost",
      retryPolicy: { retryCount: 25, retryWindowInMinutes: 4 },
    },
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
      ],
    },
    correlationId: "evmwonebfzxenjdpucgcwdjdya",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitDeallocate: Schedule deallocate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesSubmitDeallocate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitDeallocateMinimumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitDeallocate(
    "ccrsyfkiakaxblrddurmxbju",
    {
      schedule: { deadlineType: "Unknown" },
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
        ],
      },
      correlationId: "evmwonebfzxenjdpucgcwdjdya",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesSubmitDeallocateMaximumSetGenGeneratedByMaximumSetRule();
  await scheduledActionsVirtualMachinesSubmitDeallocateMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
