// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { getLongRunningPoller } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to The operation to delete the extension.
 *
 * @summary The operation to delete the extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachineExtensions_Delete_MaximumSet_Gen.json
 */
async function virtualMachineExtensionsDeleteMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaa";
  const vmExtensionName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmName,
      vmExtensionName
    )
    .delete(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineExtensionsDeleteMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to delete the extension.
 *
 * @summary The operation to delete the extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineExamples/VirtualMachineExtensions_Delete_MinimumSet_Gen.json
 */
async function virtualMachineExtensionsDeleteMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmName = "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const vmExtensionName = "aa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachines/{vmName}/extensions/{vmExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmName,
      vmExtensionName
    )
    .delete(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineExtensionsDeleteMinimumSetGen().catch(console.error);
