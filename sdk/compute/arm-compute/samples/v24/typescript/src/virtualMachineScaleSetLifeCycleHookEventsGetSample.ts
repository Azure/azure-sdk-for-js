// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a virtual machine scale set lifecycle hook event.
 *
 * @summary gets a virtual machine scale set lifecycle hook event.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetLifeCycleHookEvent_Get.json
 */
async function getAVirtualMachineScaleSetLifecycleHookEvent(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2167b012-c9f9-4b04-83b2-0ff304e7d51d";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetLifeCycleHookEvents.get(
    "RG01",
    "VMSS01",
    "2e2e3046-f85f-4966-8fd2-5fd7bf6ea717",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAVirtualMachineScaleSetLifecycleHookEvent();
}

main().catch(console.error);
