// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 *
 * @summary shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Redeploy_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetVMRedeployMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.redeploy(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
}

/**
 * This sample demonstrates how to shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 *
 * @summary shuts down the virtual machine in the virtual machine scale set, moves it to a new node, and powers it back on.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Redeploy_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetVMRedeployMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMs.redeploy(
    "rgcompute",
    "aaaaaaaaaaaaa",
    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  );
}

async function main() {
  await virtualMachineScaleSetVMRedeployMaximumSetGen();
  await virtualMachineScaleSetVMRedeployMinimumSetGen();
}

main().catch(console.error);
