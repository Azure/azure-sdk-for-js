// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteDeallocate: Execute deallocate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesExecuteDeallocate.json
 */
async function scheduledActionsVirtualMachinesExecuteDeallocate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D8E30CC0-2763-4FCC-84A8-3C5659281032";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteDeallocate("eastus2euap", {
    executionParameters: {
      retryPolicy: { retryCount: 4, retryWindowInMinutes: 27 },
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
  await scheduledActionsVirtualMachinesExecuteDeallocate();
}

main().catch(console.error);
