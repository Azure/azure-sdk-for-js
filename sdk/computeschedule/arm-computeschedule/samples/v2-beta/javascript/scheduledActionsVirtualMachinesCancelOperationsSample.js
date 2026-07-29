// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations("eastus2", {
    operationIds: ["01234567-89ab-cdef-0123-456789abcdef"],
    correlationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-04-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations("eastus2", {
    operationIds: ["01234567-89ab-cdef-0123-456789abcdef"],
    correlationId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesCancelOperationsMaximumSet();
  await scheduledActionsVirtualMachinesCancelOperationsMinimumSet();
}

main().catch(console.error);
