// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitHibernate: Schedule hibernate operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesSubmitHibernate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitHibernateMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitHibernate("aoewv", {
    schedule: {
      deadline: "2026-03-12T02:39:44.444Z",
      userRequestDeadline: "2026-03-12T02:39:44.444Z",
      timezone: "ehbjytlhnykfkjxujca",
      userRequestTimezone: "feiohhavpmmjrf",
      deadlineType: "Unknown",
    },
    executionParameters: {
      optimizationPreference: "Cost",
      retryPolicy: { retryCount: 19, retryWindowInMinutes: 3, onFailureAction: "Unknown" },
    },
    resources: {
      ids: [
        "/subscriptions/11111111-1111-1111-1111-111111111111/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/vm1",
      ],
    },
    correlationId: "lgpkqjojane",
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesSubmitHibernateMaximumSet();
}

main().catch(console.error);
