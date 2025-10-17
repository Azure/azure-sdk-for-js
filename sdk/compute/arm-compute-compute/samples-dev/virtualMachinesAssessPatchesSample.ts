// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to assess patches on the VM.
 *
 * @summary assess patches on the VM.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_AssessPatches.json
 */
async function assessPatchStateOfAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.assessPatches("myResourceGroupName", "myVMName");
  console.log(result);
}

async function main(): Promise<void> {
  await assessPatchStateOfAVirtualMachine();
}

main().catch(console.error);
