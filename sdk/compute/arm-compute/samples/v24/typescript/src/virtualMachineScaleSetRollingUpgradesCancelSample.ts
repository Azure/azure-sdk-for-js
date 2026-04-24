// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels the current virtual machine scale set rolling upgrade.
 *
 * @summary cancels the current virtual machine scale set rolling upgrade.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_Cancel_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeCancelMaximumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetRollingUpgrades.cancel("rgcompute", "aaaaa");
}

/**
 * This sample demonstrates how to cancels the current virtual machine scale set rolling upgrade.
 *
 * @summary cancels the current virtual machine scale set rolling upgrade.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_Cancel_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeCancelMinimumSetGen(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetRollingUpgrades.cancel("rgcompute", "aaaaaa");
}

async function main(): Promise<void> {
  await virtualMachineScaleSetRollingUpgradeCancelMaximumSetGen();
  await virtualMachineScaleSetRollingUpgradeCancelMinimumSetGen();
}

main().catch(console.error);
