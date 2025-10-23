// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to assess patches on the VM.
 *
 * @summary assess patches on the VM.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_AssessPatches.json
 */
async function assessPatchStateOfAVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.assessPatches("myResourceGroupName", "myVMName");
  console.log(result);
}

async function main() {
  await assessPatchStateOfAVirtualMachine();
}

main().catch(console.error);
