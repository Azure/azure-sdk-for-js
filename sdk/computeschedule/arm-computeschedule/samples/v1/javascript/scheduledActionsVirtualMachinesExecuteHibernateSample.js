// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteHibernate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteHibernateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteHibernate(
    "pxjjubifupovxakrcjafxrcbgizolx",
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
      correlationId: "jmdiz",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteHibernate: Execute hibernate operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesExecuteHibernate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteHibernateMinimumSetGenGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteHibernate(
    "klbbfkgnebotnwosvbsze",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/YourSubscriptionId/resourceGroups/YourResourceGroupName/providers/Microsoft.Compute/virtualMachines/testResource3",
        ],
      },
      correlationId: "jmdiz",
    },
  );
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesExecuteHibernateMaximumSetGenGeneratedByMaximumSetRule();
  await scheduledActionsVirtualMachinesExecuteHibernateMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
