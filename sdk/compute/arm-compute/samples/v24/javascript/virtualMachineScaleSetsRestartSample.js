// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restarts one or more virtual machines in a VM scale set.
 *
 * @summary restarts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Restart_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRestartMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.restart("rgcompute", "aaaaaaaaaaaaaaaaaaa", {
    vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] },
  });
}

/**
 * This sample demonstrates how to restarts one or more virtual machines in a VM scale set.
 *
 * @summary restarts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Restart_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRestartMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineScaleSets.restart("rgcompute", "aaaa");
}

async function main() {
  await virtualMachineScaleSetRestartMaximumSetGen();
  await virtualMachineScaleSetRestartMinimumSetGen();
}

main().catch(console.error);
