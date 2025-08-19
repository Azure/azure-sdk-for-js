// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations("qk", {
    operationIds: ["rcudibq"],
    correlationId: "lacjacfbxixdmg",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2025-05-01/ScheduledActions_VirtualMachinesCancelOperations_MinimumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesCancelOperationsMinimumSetGenGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0505D8E4-D41A-48FB-9CA5-4AF8D93BE75F";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesCancelOperations(
    "ouubdthkhmkgcijtcc",
    { operationIds: ["rcudibq"], correlationId: "lacjacfbxixdmg" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRule();
  await scheduledActionsVirtualMachinesCancelOperationsMinimumSetGenGeneratedByMinimumSetRule();
}

main().catch(console.error);
