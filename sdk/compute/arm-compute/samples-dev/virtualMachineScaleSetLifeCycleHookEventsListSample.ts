// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a list of virtual machine scale set lifecycle hook events created for a virtual machine scale set resource.
 *
 * @summary gets a list of virtual machine scale set lifecycle hook events created for a virtual machine scale set resource.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetLifeCycleHookEvent_List.json
 */
async function getsAListOfAllLifecycleHookEventsInAVirtualMachineScaleSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "2e2e3046-f85f-4966-8fd2-5fd7bf6ea717";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetLifeCycleHookEvents.list(
    "RG01",
    "VMSS01",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsAListOfAllLifecycleHookEventsInAVirtualMachineScaleSet();
}

main().catch(console.error);
