// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitStart_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitStartMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitStart("pxtvvk", {
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
 * This sample demonstrates how to virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future.
 *
 * @summary virtualMachinesSubmitStart: Schedule start operation for a batch of virtual machines at datetime in future.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesSubmitStart_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesSubmitStartMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesSubmitStart("ufrcsuw", {
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
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesSubmitStartMaximumSet();
  await scheduledActionsVirtualMachinesSubmitStartMinimumSet();
}

main().catch(console.error);
