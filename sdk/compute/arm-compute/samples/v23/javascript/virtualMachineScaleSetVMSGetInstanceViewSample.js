// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the status of a virtual machine from a VM scale set.
 *
 * @summary Gets the status of a virtual machine from a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Get_InstanceViewAutoPlacedOnDedicatedHostGroup.json
 */
async function getInstanceViewOfAVirtualMachineFromAVMScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmScaleSetName = "myVirtualMachineScaleSet";
  const instanceId = "0";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetVMs.getInstanceView(
    resourceGroupName,
    vmScaleSetName,
    instanceId,
  );
  console.log(result);
}

async function main() {
  await getInstanceViewOfAVirtualMachineFromAVMScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement();
}

main().catch(console.error);
