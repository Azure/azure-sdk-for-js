// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Deletes a virtual machine from a VM scale set.
 *
 * @summary Deletes a virtual machine from a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Delete_Force.json
 */
async function forceDeleteAVirtualMachineFromAVMScaleSet() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const forceDeletion = true;
  const options = {
    forceDeletion,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMs.beginDeleteAndWait(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
    options,
  );
  console.log(result);
}

async function main() {
  await forceDeleteAVirtualMachineFromAVMScaleSet();
}

main().catch(console.error);
