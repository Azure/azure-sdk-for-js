// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 *
 * @summary virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesGetOperationErrors_MaximumSet_Gen.json
 */

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

async function scheduledActionsVirtualMachinesGetOperationErrorsMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationErrors(
    "ennweqswbghorrgzbet",
    { operationIds: ["ksufjznokhsbowdupyt"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 *
 * @summary virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesGetOperationErrors_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesGetOperationErrorsMinimumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationErrors("gcdqwzmxtcn", {
    operationIds: ["ksufjznokhsbowdupyt"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesGetOperationErrorsMaximumSetGenGeneratedByMaximumSetRule();
  await scheduledActionsVirtualMachinesGetOperationErrorsMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
