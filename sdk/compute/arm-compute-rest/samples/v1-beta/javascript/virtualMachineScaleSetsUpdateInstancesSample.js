// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { getLongRunningPoller } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_UpdateInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsUpdateInstancesMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    body: { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsUpdateInstancesMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_UpdateInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsUpdateInstancesMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    body: { instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"] },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/manualupgrade",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsUpdateInstancesMinimumSetGen().catch(console.error);
