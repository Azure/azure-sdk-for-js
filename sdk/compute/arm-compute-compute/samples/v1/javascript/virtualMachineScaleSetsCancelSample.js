// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels the current virtual machine scale set rolling upgrade.
 *
 * @summary cancels the current virtual machine scale set rolling upgrade.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_Cancel_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeCancelMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.cancel("rgcompute", "aaaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to cancels the current virtual machine scale set rolling upgrade.
 *
 * @summary cancels the current virtual machine scale set rolling upgrade.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_Cancel_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeCancelMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.cancel("rgcompute", "aaaaaa");
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetRollingUpgradeCancelMaximumSetGen();
  await virtualMachineScaleSetRollingUpgradeCancelMinimumSetGen();
}

main().catch(console.error);
