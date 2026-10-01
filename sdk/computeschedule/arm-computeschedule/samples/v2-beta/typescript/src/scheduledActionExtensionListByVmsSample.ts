// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list ScheduledActionResources resources by parent
 *
 * @summary list ScheduledActionResources resources by parent
 * x-ms-original-file: 2026-04-15-preview/ScheduledActionExtension_ListByVms_MaximumSet_Gen.json
 */
async function scheduledActionExtensionListByVmsMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ComputeScheduleClient(credential);
  const resArray = new Array();
  for await (const item of client.scheduledActionExtension.listByVms(
    "subscriptions/732116BD-AF31-4E74-9283-B387C44B4A44/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/myVm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to list ScheduledActionResources resources by parent
 *
 * @summary list ScheduledActionResources resources by parent
 * x-ms-original-file: 2026-04-15-preview/ScheduledActionExtension_ListByVms_MinimumSet_Gen.json
 */
async function scheduledActionExtensionListByVmsMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ComputeScheduleClient(credential);
  const resArray = new Array();
  for await (const item of client.scheduledActionExtension.listByVms(
    "subscriptions/732116BD-AF31-4E74-9283-B387C44B4A44/resourceGroups/rgcomputeschedule/providers/Microsoft.Compute/virtualMachines/myVm",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await scheduledActionExtensionListByVmsMaximumSet();
  await scheduledActionExtensionListByVmsMinimumSet();
}

main().catch(console.error);
