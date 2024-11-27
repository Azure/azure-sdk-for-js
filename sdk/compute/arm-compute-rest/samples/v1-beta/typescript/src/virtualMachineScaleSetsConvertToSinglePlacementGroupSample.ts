// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineScaleSetsConvertToSinglePlacementGroupParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 *
 * @summary Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_ConvertToSinglePlacementGroup_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsConvertToSinglePlacementGroupMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsConvertToSinglePlacementGroupParameters = {
    body: { activePlacementGroupId: "aaaaaaaaaaaaaaaaaaaaaaaaaaa" },
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/convertToSinglePlacementGroup",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  console.log(result);
}

virtualMachineScaleSetsConvertToSinglePlacementGroupMaximumSetGen().catch(
  console.error
);
/**
 * This sample demonstrates how to Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 *
 * @summary Converts SinglePlacementGroup property to false for a existing virtual machine scale set.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_ConvertToSinglePlacementGroup_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsConvertToSinglePlacementGroupMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaa";
  const options: VirtualMachineScaleSetsConvertToSinglePlacementGroupParameters = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/convertToSinglePlacementGroup",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  console.log(result);
}

virtualMachineScaleSetsConvertToSinglePlacementGroupMinimumSetGen().catch(
  console.error
);
