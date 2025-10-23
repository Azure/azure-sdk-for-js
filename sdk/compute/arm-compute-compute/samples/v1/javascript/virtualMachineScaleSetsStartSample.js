// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts one or more virtual machines in a VM scale set.
 *
 * @summary starts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Start_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetStartMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.start(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
    { vmInstanceIDs: { instanceIds: ["aaaaaaaaaaaaaaaaa"] } },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to starts one or more virtual machines in a VM scale set.
 *
 * @summary starts one or more virtual machines in a VM scale set.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Start_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetStartMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.start("rgcompute", "aaaaaaaaaaaaaaaaaaa");
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetStartMaximumSetGen();
  await virtualMachineScaleSetStartMinimumSetGen();
}

main().catch(console.error);
