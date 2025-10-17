// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 *
 * @summary manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ForceRecoveryServiceFabricPlatformUpdateDomainWalk_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetForceRecoveryServiceFabricPlatformUpdateDomainWalkMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.virtualMachineScaleSets.forceRecoveryServiceFabricPlatformUpdateDomainWalk(
      "rgcompute",
      "aaaaaaaaaaaaaaaa",
      30,
    );
  console.log(result);
}

/**
 * This sample demonstrates how to manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 *
 * @summary manual platform update domain walk to update virtual machines in a service fabric virtual machine scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ForceRecoveryServiceFabricPlatformUpdateDomainWalk_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetForceRecoveryServiceFabricPlatformUpdateDomainWalkMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.virtualMachineScaleSets.forceRecoveryServiceFabricPlatformUpdateDomainWalk(
      "rgcompute",
      "aaaaaaaaaaaa",
      9,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetForceRecoveryServiceFabricPlatformUpdateDomainWalkMaximumSetGen();
  await virtualMachineScaleSetForceRecoveryServiceFabricPlatformUpdateDomainWalkMinimumSetGen();
}

main().catch(console.error);
