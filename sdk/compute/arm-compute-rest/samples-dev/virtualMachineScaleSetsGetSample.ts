// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetsGetParameters,
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Display information about a virtual machine scale set.
 *
 * @summary Display information about a virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get_WithDiskControllerType.json
 */
async function getVMScaleSetVMWithDiskControllerType() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myVirtualMachineScaleSet";
  const options: VirtualMachineScaleSetsGetParameters = {
    queryParameters: { "api-version": "2022-08-01", $expand: "userData" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .get(options);
  console.log(result);
}

getVMScaleSetVMWithDiskControllerType().catch(console.error);
/**
 * This sample demonstrates how to Display information about a virtual machine scale set.
 *
 * @summary Display information about a virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get.json
 */
async function getAVirtualMachineScaleSet() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myVirtualMachineScaleSet";
  const options: VirtualMachineScaleSetsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .get(options);
  console.log(result);
}

getAVirtualMachineScaleSet().catch(console.error);
/**
 * This sample demonstrates how to Display information about a virtual machine scale set.
 *
 * @summary Display information about a virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get_AutoPlacedOnDedicatedHostGroup.json
 */
async function getAVirtualMachineScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myVirtualMachineScaleSet";
  const options: VirtualMachineScaleSetsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .get(options);
  console.log(result);
}

getAVirtualMachineScaleSetPlacedOnADedicatedHostGroupThroughAutomaticPlacement().catch(
  console.error,
);
/**
 * This sample demonstrates how to Display information about a virtual machine scale set.
 *
 * @summary Display information about a virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_Get_WithUserData.json
 */
async function getAVirtualMachineScaleSetWithUserData() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myVirtualMachineScaleSet";
  const options: VirtualMachineScaleSetsGetParameters = {
    queryParameters: { "api-version": "2022-08-01", $expand: "userData" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
    )
    .get(options);
  console.log(result);
}

getAVirtualMachineScaleSetWithUserData().catch(console.error);
