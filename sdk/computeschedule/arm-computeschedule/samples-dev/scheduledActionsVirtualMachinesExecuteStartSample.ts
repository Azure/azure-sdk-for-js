// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteStart_MaximumSet_Gen.json
 */

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

async function scheduledActionsVirtualMachinesExecuteStartMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteStart("qk", {
    executionParameters: {
      optimizationPreference: "Cost",
      retryPolicy: { retryCount: 17, retryWindowInMinutes: 29 },
    },
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource4",
      ],
    },
    correlationId: "b211f086-4b91-4686-a453-2f5c012e4d80",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteStart_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteStartMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteStart(
    "fbdewllahrteoavajbomjc",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource4",
        ],
      },
      correlationId: "b211f086-4b91-4686-a453-2f5c012e4d80",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesExecuteStartMaximumSet();
  await scheduledActionsVirtualMachinesExecuteStartMinimumSet();
}

main().catch(console.error);
