// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 *
 * @summary reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Reapply_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsReapplyMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b4f1213b-cacc-4816-8bfb-f30f90643de8";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.reapply(
    "VirtualMachineScaleSetReapplyTestRG",
    "VMSSReapply-Test-ScaleSet",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 *
 * @summary reapplies the Virtual Machine Scale Set Virtual Machine Profile to the Virtual Machine Instances
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Reapply_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsReapplyMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "b4f1213b-cacc-4816-8bfb-f30f90643de8";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.reapply(
    "VirtualMachineScaleSetReapplyTestRG",
    "VMSSReapply-Test-ScaleSet",
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetsReapplyMaximumSetGen();
  await virtualMachineScaleSetsReapplyMinimumSetGen();
}

main().catch(console.error);
