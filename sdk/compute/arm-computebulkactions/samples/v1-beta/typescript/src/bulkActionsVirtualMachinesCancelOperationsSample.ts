// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeBulkActionsClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesCancelOperations_MaximumSet_Gen.json
 */
async function bulkActionsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "D8E30CC0-2763-4FCC-84A8-3C5659281032";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesCancelOperations("eastus2euap", {
    operationIds: ["2a3fce8e-874c-45f4-9d27-1a804f3b7a0f"],
    correlationid: "4431320c-7a90-4300-b82b-73f0696ae50e",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-02-01-preview/BulkActions_VirtualMachinesCancelOperations_MinimumSet_Gen.json
 */
async function bulkActionsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "50352BBD-59F1-4EE2-BA9C-A6E51B0B1B2B";
  const client = new ComputeBulkActionsClient(credential, subscriptionId);
  const result = await client.bulkActions.virtualMachinesCancelOperations("eastus2euap", {
    operationIds: ["23480d2f-1dca-4610-afb4-dd25eec1f34r"],
    correlationid: "4431320c-7a90-4300-b82b-73f0696ae50e",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await bulkActionsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRule();
  await bulkActionsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
