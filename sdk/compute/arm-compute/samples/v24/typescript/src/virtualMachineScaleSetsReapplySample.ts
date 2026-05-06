// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 *
 * @summary reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Reapply_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsReapplyMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b4f1213b-cacc-4816-8bfb-f30f90643de8";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.reapply(
    "VirtualMachineScaleSetReapplyTestRG",
    "VMSSReapply-Test-ScaleSet",
  );
}

/**
 * This sample demonstrates how to reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 *
 * @summary reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Reapply_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsReapplyMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b4f1213b-cacc-4816-8bfb-f30f90643de8";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.reapply(
    "VirtualMachineScaleSetReapplyTestRG",
    "VMSSReapply-Test-ScaleSet",
  );
}

async function main(): Promise<void> {
  await virtualMachineScaleSetsReapplyMaximumSetGen();
  await virtualMachineScaleSetsReapplyMinimumSetGen();
}

main().catch(console.error);
