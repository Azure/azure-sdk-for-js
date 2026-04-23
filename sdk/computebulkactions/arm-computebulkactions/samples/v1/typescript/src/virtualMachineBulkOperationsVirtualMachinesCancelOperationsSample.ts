// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-computebulkactions";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesCancelOperations_MaximumSet_Gen.json
 */
async function virtualMachineBulkOperationsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.virtualMachinesCancelOperations(
    "xmzsfgyxcwqirafdb",
    { operationIds: ["woyuibvoatacnvzpstmnez"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 *
 * @summary virtualMachinesCancelOperations: Cancel a previously submitted (start/deallocate/hibernate) request
 * x-ms-original-file: 2026-04-01/VirtualMachineBulkOperations_VirtualMachinesCancelOperations_MinimumSet_Gen.json
 */
async function virtualMachineBulkOperationsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "401789D7-9B98-4B5A-AF58-808C415E37B4";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineBulkOperations.virtualMachinesCancelOperations(
    "xqhkqmwxablwt",
    { operationIds: ["woyuibvoatacnvzpstmnez"] },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineBulkOperationsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMaximumSetRule();
  await virtualMachineBulkOperationsVirtualMachinesCancelOperationsMaximumSetGenGeneratedByMaximumSetRuleGeneratedByMinimumSetRule();
}

main().catch(console.error);
