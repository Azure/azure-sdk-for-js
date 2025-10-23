// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 *
 * @summary shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Redeploy_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMRedeployMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.redeploy(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 *
 * @summary shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Redeploy_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMRedeployMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMS.redeploy(
    "rgcompute",
    "aaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetVMRedeployMaximumSetGen();
  await virtualMachineScaleSetVMRedeployMinimumSetGen();
}

main().catch(console.error);
