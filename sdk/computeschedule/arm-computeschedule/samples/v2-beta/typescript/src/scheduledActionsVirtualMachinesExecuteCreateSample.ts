// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeScheduleClient } from "@azure/arm-computeschedule";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to [PRIVATE PREVIEW]: VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary [PRIVATE PREVIEW]: VirtualMachinesExecuteCreate: Execute create operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-03-01-preview/ScheduledActions_VirtualMachinesExecuteCreate_MaximumSet_Gen.json
 */
async function scheduledActionsVirtualMachinesExecuteCreateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "732116BD-AF31-4E74-9283-B387C44B4A44";
  const client = new ComputeScheduleClient(credential, subscriptionId);
  const result = await client.scheduledActions.virtualMachinesExecuteCreate("tcvpodlxbyg", {
    resourceConfigParameters: {
      baseProfile: {},
      resourceOverrides: [{}],
      resourceCount: 19,
      resourcePrefix: "ilgcqhoqrpwfkprxok",
    },
    executionParameters: {
      optimizationPreference: "Cost",
      retryPolicy: { retryCount: 19, retryWindowInMinutes: 3, onFailureAction: "Unknown" },
    },
    correlationId: "pkm",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await scheduledActionsVirtualMachinesExecuteCreateMaximumSet();
}

main().catch(console.error);
