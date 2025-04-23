// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2024-10-01/ScheduledActions_VirtualMachinesGetOperationStatus.json
 */
async function scheduledActionsVirtualMachinesGetOperationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D8E30CC0-2763-4FCC-84A8-3C5659281032";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationStatus("eastus2euap", {
    operationIds: ["23480d2f-1dca-4610-afb4-dd25eec1f34r"],
    correlationId: "35780d2f-1dca-4610-afb4-dd25eec1f34r",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesGetOperationStatus();
}

main().catch(console.error);
