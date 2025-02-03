// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 *
 * @summary virtualMachinesGetOperationErrors: Get error details on operation errors (like transient errors encountered, additional logs) if they exist.
 * x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesGetOperationErrors.json
 */
async function scheduledActionsVirtualMachinesGetOperationErrors(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D8E30CC0-2763-4FCC-84A8-3C5659281032";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationErrors("eastus2euap", {
    operationIds: ["23480d2f-1dca-4610-afb4-dd25eec1f34r"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesGetOperationErrors();
}

main().catch(console.error);
