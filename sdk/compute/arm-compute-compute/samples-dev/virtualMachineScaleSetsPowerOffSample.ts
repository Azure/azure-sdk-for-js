// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges.
 *
 * @summary power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_PowerOff_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetPowerOffMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.powerOff("rgcompute", "aaaaaaaaaaaaaaaaaa", {
    vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] },
    skipShutdown: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges.
 *
 * @summary power off (stop) one or more virtual machines in a VM scale set. Note that resources are still attached and you are getting charged for the resources. Instead, use deallocate to release resources and avoid charges.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_PowerOff_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetPowerOffMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.powerOff("rgcompute", "a");
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetPowerOffMaximumSetGen();
  await virtualMachineScaleSetPowerOffMinimumSetGen();
}

main().catch(console.error);
