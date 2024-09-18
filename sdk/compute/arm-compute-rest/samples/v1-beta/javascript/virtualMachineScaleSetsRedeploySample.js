// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const createComputeManagementClient = require("@azure-rest/arm-compute").default,
  { getLongRunningPoller } = require("@azure-rest/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv").config();

/**
 * This sample demonstrates how to Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 *
 * @summary Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_Redeploy_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetsRedeployMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    body: { instanceIds: ["aaaaaaaaaaaaaaaaa"] },
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsRedeployMaximumSetGen().catch(console.error);
/**
 * This sample demonstrates how to Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 *
 * @summary Shuts down all the virtual machines in the virtual machine scale set, moves them to a new node, and powers them back on.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2022-08-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSets_Redeploy_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetsRedeployMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const client = createComputeManagementClient(credential);
  const subscriptionId = "";
  const resourceGroupName = "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaa";
  const options = {
    queryParameters: { "api-version": "2022-08-01" },
  };
  const initialResponse = await client
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/virtualMachineScaleSets/{vmScaleSetName}/redeploy",
      subscriptionId,
      resourceGroupName,
      vmScaleSetName
    )
    .post(options);
  const poller = getLongRunningPoller(client, initialResponse);
  const result = await poller.pollUntilDone();
  console.log(result);
}

virtualMachineScaleSetsRedeployMinimumSetGen().catch(console.error);
