// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 *
 * @summary captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Capture_MaximumSet_Gen.json
 */
async function virtualMachineCaptureMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.capture("rgcompute", "aaaaaaaaaaaaaaaaaaaa", {
    vhdPrefix: "aaaaaaaaa",
    destinationContainerName: "aaaaaaa",
    overwriteVhds: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 *
 * @summary captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_Capture_MinimumSet_Gen.json
 */
async function virtualMachineCaptureMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.capture("rgcompute", "aaaaaaaaaaaaa", {
    vhdPrefix: "aaaaaaaaa",
    destinationContainerName: "aaaaaaa",
    overwriteVhds: true,
  });
  console.log(result);
}

async function main() {
  await virtualMachineCaptureMaximumSetGen();
  await virtualMachineCaptureMinimumSetGen();
}

main().catch(console.error);
