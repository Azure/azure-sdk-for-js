// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeScheduleClient } = require("@azure/arm-computeschedule");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 *
 * @summary virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesGetOperationErrors_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesGetOperationErrorsMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationErrors("hvevnodfnj", {
    operationIds: ["enrmeatzaw"],
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 *
 * @summary virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesGetOperationErrors_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesGetOperationErrorsMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationErrors("vkkri", {
    operationIds: ["enrmeatzaw"],
  });
  console.log(result);
}

async function main() {
  await scheduledActionsVirtualMachinesGetOperationErrorsMaximumSet();
  await scheduledActionsVirtualMachinesGetOperationErrorsMinimumSet();
}

main().catch(console.error);
