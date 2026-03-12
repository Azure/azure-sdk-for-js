// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 *
 * @summary Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineExamples/VirtualMachine_Capture_MaximumSet_Gen.json
 */
async function virtualMachineCaptureMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaaaa";
  const parameters = {
    destinationContainerName: "aaaaaaa",
    overwriteVhds: true,
    vhdPrefix: "aaaaaaaaa",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginCaptureAndWait(
    resourceGroupName,
    vmName,
    parameters,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 *
 * @summary Captures the VM by copying virtual hard disks of the VM and outputs a template that can be used to create similar VMs.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineExamples/VirtualMachine_Capture_MinimumSet_Gen.json
 */
async function virtualMachineCaptureMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmName = "aaaaaaaaaaaaa";
  const parameters = {
    destinationContainerName: "aaaaaaa",
    overwriteVhds: true,
    vhdPrefix: "aaaaaaaaa",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginCaptureAndWait(
    resourceGroupName,
    vmName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await virtualMachineCaptureMaximumSetGen();
  await virtualMachineCaptureMinimumSetGen();
}

main().catch(console.error);
