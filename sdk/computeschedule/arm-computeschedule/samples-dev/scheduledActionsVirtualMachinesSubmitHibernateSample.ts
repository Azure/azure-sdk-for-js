// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MaximumSet_Gen.json
 */

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

async function scheduledActionsVirtualMachinesSubmitHibernateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitHibernate("rhadyapnyvmobwg", {
    schedule: {
      userRequestDeadline: "2025-04-17T00:23:56.803Z",
      userRequestTimezone: "aigbjdnldtzkteqi",
      deadlineType: "Unknown",
    },
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
 * This sample demonstrates how to virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitHibernateMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitHibernate(
    "zuevcqpgdohzbjodhachtr",
    {
      schedule: {
        userRequestDeadline: "2025-04-17T00:23:56.803Z",
        userRequestTimezone: "aigbjdnldtzkteqi",
        deadlineType: "Unknown",
      },
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
  await scheduledActionsVirtualMachinesSubmitHibernateMaximumSet();
  await scheduledActionsVirtualMachinesSubmitHibernateMinimumSet();
}

main().catch(console.error);
