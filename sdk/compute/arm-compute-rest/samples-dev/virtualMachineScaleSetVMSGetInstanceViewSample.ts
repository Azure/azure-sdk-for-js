// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets the status of a virtual machine from a VM scale set.
 *
 * @summary Gets the status of a virtual machine from a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Get_InstanceViewAutoPlacedOnDedicatedHostGroup.json
 */

import type { VirtualMachineScaleSetVMsGetInstanceViewParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getInstanceViewOfAVirtualMachineFromAVMScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myVirtualMachineScaleSet";
  const instanceId = "0";
  const options: VirtualMachineScaleSetVMsGetInstanceViewParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/instanceView",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId,
    )
    .get(options);
  console.log(result);
}

getInstanceViewOfAVirtualMachineFromAVMScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement().catch(
  console.error,
);
