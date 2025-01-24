// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesSubmitHibernate.json
 */
async function scheduledActionsVirtualMachinesSubmitHibernate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D8E30CC0-2763-4FCC-84A8-3C5659281032";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitHibernate("eastus2euap", {
    schedule: {
      deadline: "2024-11-01T17:52:54.215Z",
      timezone: "UTC",
      deadlineType: "InitiateAt",
    },
    executionParameters: {
      retryPolicy: { retryCount: 2, retryWindowInMinutes: 27 },
    },
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
      ],
    },
    correlationId: "23480d2f-1dca-4610-afb4-dd25eec1f34r",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesSubmitHibernate();
}

main().catch(console.error);
