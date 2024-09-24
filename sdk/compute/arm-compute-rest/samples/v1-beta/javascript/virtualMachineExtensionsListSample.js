// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to The operation to get all extensions of a Virtual Machine.
 *
 * @summary The operation to get all extensions of a Virtual Machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachineExtensions_List_MaximumSet_Gen.json
 */
async function virtualMachineExtensionsListMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaa";
  const options = {
    queryParameters: {
      $expand: "aaaaaaaaaaaaaaaaa",
      "api-version": "2022-08-01",
    },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionsListMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to get all extensions of a Virtual Machine.
 *
 * @summary The operation to get all extensions of a Virtual Machine.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachineExtensions_List_MinimumSet_Gen.json
 */
async function virtualMachineExtensionsListMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions",
      subscriptionId,
      resourceGroupName,
      vmName
    )
    .get(options);
  console.log(result);
}

virtualMachineExtensionsListMinimumSetGen().catch(console.error);
