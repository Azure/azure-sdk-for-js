// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.updateInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.updateInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetUpdateInstancesMaximumSetGen();
  await virtualMachineScaleSetUpdateInstancesMinimumSetGen();
}

main().catch(console.error);
