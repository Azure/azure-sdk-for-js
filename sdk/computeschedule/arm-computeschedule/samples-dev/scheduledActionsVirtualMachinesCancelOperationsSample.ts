// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json
 */

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

async function scheduledActionsVirtualMachinesCancelOperationsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations(
    "nivsvluajruxhmsfgmxjnl",
    {
      operationIds: ["b211f086-4b91-4686-a453-2f5c012e4d80"],
      correlationId: "b211f086-4b91-4686-a453-2f5c012e4d80",
    },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2025-04-15-preview/ScheduledActions_VirtualMachinesCancelOperations_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "CB26D7CB-3E27-465F-99C8-EAF7A4118245";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations(
    "fhdunfivmjiltaiakwhhwdgemfcld",
    {
      operationIds: ["b211f086-4b91-4686-a453-2f5c012e4d80"],
      correlationId: "b211f086-4b91-4686-a453-2f5c012e4d80",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesCancelOperationsMaximumSet();
  await scheduledActionsVirtualMachinesCancelOperationsMinimumSet();
}

main().catch(console.error);
