// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default;
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Gets the status of the latest virtual machine scale set rolling upgrade.
 *
 * @summary Gets the status of the latest virtual machine scale set rolling upgrade.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrades_GetLatest_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradesGetLatestMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .get(options);
  console.log(result);
}

virtualMachineScaleSetRollingUpgradesGetLatestMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Gets the status of the latest virtual machine scale set rolling upgrade.
 *
 * @summary Gets the status of the latest virtual machine scale set rolling upgrade.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrades_GetLatest_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradesGetLatestMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const result = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/rollingUpgrades/latest",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .get(options);
  console.log(result);
}

virtualMachineScaleSetRollingUpgradesGetLatestMinimumSetGen().catch(console.error);
