// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitHibernateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitHibernate("eastus2", {
    schedule: {
      deadline: "2026-03-12T02:39:44.444Z",
      userRequestDeadline: "2026-03-12T02:39:44.444Z",
      timezone: "America/Los_Angeles",
      userRequestTimezone: "America/Los_Angeles",
      deadlineType: "Unknown",
    },
    executionParameters: {
      optimizationPreference: "Cost",
      retryPolicy: { retryCount: 3, retryWindowInMinutes: 30, onFailureAction: "Unknown" },
    },
    resources: {
      ids: [
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/vm1",
      ],
    },
    correlationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitHibernateMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitHibernate("eastus2", {
    schedule: { deadlineType: "Unknown" },
    executionParameters: {},
    resources: {
      ids: [
        "/subscriptions/732116BD-AF31-4E74-9283-B387C44B4A44/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/vm1",
      ],
    },
    correlationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesSubmitHibernateMaximumSet();
  await scheduledActionsVirtualMachinesSubmitHibernateMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
