// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import createComputeManagementClient, {
  VirtualMachineExtensionsGetParameters
} from "@azure-rest/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * This sample demonstrates how to The operation to get the extension.
 *
 * @summary The operation to get the extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachineExtensions_Get_MaximumSet_Gen.json
 */
async function virtualMachineExtensionsGetMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const vmExtensionName = "aaaaaaa";
  const options: VirtualMachineExtensionsGetParameters = {
    queryParameters: { $expand: "aaaaaa", "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmName,
      vmExtensionName
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionsGetMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to get the extension.
 *
 * @summary The operation to get the extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachineExtensions_Get_MinimumSet_Gen.json
 */
async function virtualMachineExtensionsGetMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "a";
  const vmExtensionName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options: VirtualMachineExtensionsGetParameters = {
    queryParameters: { "api-version": "2022-08-01" }
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmName,
      vmExtensionName
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionsGetMinimumSetGen().catch(console.error);
