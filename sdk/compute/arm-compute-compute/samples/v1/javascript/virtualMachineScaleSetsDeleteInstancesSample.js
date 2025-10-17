// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes virtual machines in a VM scale set.
 *
 * @summary deletes virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_DeleteInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetDeleteInstancesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.deleteInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
    { forceDeletion: true },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to deletes virtual machines in a VM scale set.
 *
 * @summary deletes virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_DeleteInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetDeleteInstancesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.deleteInstances(
    "rgcompute",
    "aaaaaaaaaaaaaaa",
    { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetDeleteInstancesMaximumSetGen();
  await virtualMachineScaleSetDeleteInstancesMinimumSetGen();
}

main().catch(console.error);
