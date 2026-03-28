// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesExecuteStart_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsVirtualMachinesExecuteStartMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.virtualMachinesExecuteStart("a", {
    executionParameters: {
      retryPolicy: { retryCount: 2, retryWindowInMinutes: 20, onFailureAction: "Unknown" },
    },
    resources: {
      ids: [
        "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
      ],
    },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 *
 * @summary virtualMachinesExecuteStart: Execute start operation for a batch of virtual machines, this operation is triggered as soon as Computeschedule receives it.
 * x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesExecuteStart_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsVirtualMachinesExecuteStartMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.virtualMachinesExecuteStart(
    "odgfmtfhwrhbngawcszvjbqgtrv",
    {
      executionParameters: {},
      resources: {
        ids: [
          "/subscriptions/12345678-1234-1234-1234-123456789012/resourceGroups/myResourceGroup/providers/Microsoft.Compute/virtualMachines/myVM",
        ],
      },
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineBulkOperationsVirtualMachinesExecuteStartMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await virtualMachineBulkOperationsVirtualMachinesExecuteStartMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
