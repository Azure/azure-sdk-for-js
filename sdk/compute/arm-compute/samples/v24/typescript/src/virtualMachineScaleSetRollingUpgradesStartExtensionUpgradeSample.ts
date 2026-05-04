// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected.
 *
 * @summary starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_RollingUpgrade.json
 */
async function startAnExtensionRollingUpgrade(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade(
    "myResourceGroup",
    "{vmss-name}",
  );
}

async function main(): Promise<void> {
  await startAnExtensionRollingUpgrade();
}

main().catch(console.error);
