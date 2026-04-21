// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to reapply a virtual machine's state.
 *
 * @summary the operation to reapply a virtual machine's state.
 * x-ms-original-file: 2025-11-01/virtualMachineExamples/VirtualMachine_Reapply.json
 */
async function reapplyTheStateOfAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachines.reapply("ResourceGroup", "VMName");
}

async function main(): Promise<void> {
  await reapplyTheStateOfAVirtualMachine();
}

main().catch(console.error);
