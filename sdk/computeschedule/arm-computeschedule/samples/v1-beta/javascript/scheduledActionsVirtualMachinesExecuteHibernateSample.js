// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteHibernateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteHibernate("gztd", {
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
 * This sample demonstrates how to virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesExecuteHibernate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteHibernateMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteHibernate("xtmm", {
    executionParameters: {},
    resources: {
      ids: [
        "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource4",
      ],
    },
    correlationId: "b211f086-4b91-4686-a453-2f5c012e4d80",
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesExecuteHibernateMaximumSet();
  await scheduledActionsVirtualMachinesExecuteHibernateMinimumSet();
}

main().catch(console.error);
