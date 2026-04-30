// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.updateInstances("rgcompute", "aaaaaaaaaaaaaaaaaaaaaaaa", {
    instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"],
  });
}

/**
 * This sample demonstrates how to upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.updateInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
  );
}

async function main() {
  await virtualMachineScaleSetUpdateInstancesMaximumSetGen();
  await virtualMachineScaleSetUpdateInstancesMinimumSetGen();
}

main().catch(console.error);
