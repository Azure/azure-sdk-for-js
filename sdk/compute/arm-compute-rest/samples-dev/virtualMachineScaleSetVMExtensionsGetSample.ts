// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { VirtualMachineScaleSetVMExtensionsGetParameters } from "@azure-rest/arm-compute";
import createComputeManagementClient from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to The operation to get the VMSS VM extension.
 *
 * @summary The operation to get the VMSS VM extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetVMExtensions_Get.json
 */
async function getVirtualMachineScaleSetVMExtension(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "myResourceGroup";
  const vmScaleSetName = "myvmScaleSet";
  const instanceId = "0";
  const vmExtensionName = "myVMExtension";
  const options: VirtualMachineScaleSetVMExtensionsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/virtualMachines/{instanceId}/extensions/{vmExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      instanceId,
      vmExtensionName,
    )
    .get(options);
  console.log(result);
}

getVirtualMachineScaleSetVMExtension().catch(console.error);
