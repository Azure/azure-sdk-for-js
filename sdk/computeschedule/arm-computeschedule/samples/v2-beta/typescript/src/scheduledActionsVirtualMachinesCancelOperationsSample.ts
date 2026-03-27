// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations(
    "msbzqfwhqmtrxafwwh",
    { operationIds: ["xgnpiititgkgsewft"], correlationId: "xqlibhgsczjzsbjvc" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesCancelOperationsMaximumSet();
}

main().catch(console.error);
