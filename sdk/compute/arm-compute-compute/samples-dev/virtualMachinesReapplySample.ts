// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to reapply a virtual machine's state.
 *
 * @summary the operation to reapply a virtual machine's state.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Reapply.json
 */
async function reapplyTheStateOfAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.reapply("ResourceGroup", "VMName");
  console.log(result);
}

async function main(): Promise<void> {
  await reapplyTheStateOfAVirtualMachine();
}

main().catch(console.error);
