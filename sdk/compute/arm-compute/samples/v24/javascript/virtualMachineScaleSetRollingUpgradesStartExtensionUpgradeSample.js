// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected.
 *
 * @summary starts a rolling upgrade to move all extensions for all virtual machine scale set instances to the latest available extension version. Instances which are already running the latest extension versions are not affected.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtension_RollingUpgrade.json
 */
async function startAnExtensionRollingUpgrade() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSetRollingUpgrades.startExtensionUpgrade(
    "myResourceGroup",
    "{vmss-name}",
  );
}

async function main() {
  await startAnExtensionRollingUpgrade();
}

main().catch(console.error);
