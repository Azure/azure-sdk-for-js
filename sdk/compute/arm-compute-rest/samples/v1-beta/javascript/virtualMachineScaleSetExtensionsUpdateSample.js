// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { getLongRunningPoller } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to The operation to update an extension.
 *
 * @summary The operation to update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtensions_Update_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionsUpdateMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const vmssExtensionName = "aaaa";
  const options = {
    body: {
      properties: {
        type: "{extension-Type}",
        autoUpgradeMinorVersion: true,
        enableAutomaticUpgrade: true,
        forceUpdateTag: "aaaaaaaaa",
        protectedSettings: {},
        provisionAfterExtensions: ["aa"],
        publisher: "{extension-Publisher}",
        settings: {},
        suppressFailures: true,
        typeHandlerVersion: "{handler-version}",
      },
    },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetExtensionsUpdateMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to The operation to update an extension.
 *
 * @summary The operation to update an extension.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetExtensions_Update_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetExtensionsUpdateMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const vmssExtensionName = "aa";
  const options = {
    body: {},
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/extensions/{vmssExtensionName}",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName,
      vmssExtensionName
    )
    .patch(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetExtensionsUpdateMinimumSetGen().catch(console.error);
