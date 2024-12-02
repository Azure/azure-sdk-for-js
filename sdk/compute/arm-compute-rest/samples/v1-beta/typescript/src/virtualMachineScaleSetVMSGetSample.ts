// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetVMsGetParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Gets a virtual machine from a VM scale set.
 *
 * @summary Gets a virtual machine from a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Get_WithUserData.json
 */
async function getVMScaleSetVMWithUserData() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "{vmss-name}";
  const instanceId = "0";
  const options: VirtualMachineScaleSetVMsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId
    )
    .get(options);
  console.log(result);
}

getVMScaleSetVMWithUserData().catch(console.error);
/**
 * This sample demonstrates how to Gets a virtual machine from a VM scale set.
 *
 * @summary Gets a virtual machine from a VM scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVM_Get_WithVMSizeProperties.json
 */
async function getVMScaleSetVMWithVMSizeProperties() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "{vmss-name}";
  const instanceId = "0";
  const options: VirtualMachineScaleSetVMsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId
    )
    .get(options);
  console.log(result);
}

getVMScaleSetVMWithVMSizeProperties().catch(console.error);
