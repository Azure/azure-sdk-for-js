// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 *
 * @summary virtualMachinesGetOperationStatus: Polling endpoint to read status of operations performed on virtual machines
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesGetOperationStatus_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesGetOperationStatusMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesGetOperationStatus("gcbtdawfspg", {
    operationIds: ["ehesndkmbcncsvkqvxwkbmidmaxhx"],
    correlationId: "hzpmcjplnbokebrbxrtuvxpp",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesGetOperationStatusMaximumSet();
}

main().catch(console.error);
