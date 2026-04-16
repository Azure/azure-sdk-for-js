// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaa";
  const vmInstanceIDs = {
    instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.beginUpdateInstancesAndWait(
    resourceGroupName,
    vmScaleSetName,
    vmInstanceIDs,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 *
 * @summary Upgrades one or more virtual machines to the latest SKU set in the VM scale set model.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_UpdateInstances_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetUpdateInstancesMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  const vmInstanceIDs = {
    instanceIds: ["aaaaaaaaaaaaaaaaaaaaaaaaa"],
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.beginUpdateInstancesAndWait(
    resourceGroupName,
    vmScaleSetName,
    vmInstanceIDs,
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetUpdateInstancesMaximumSetGen();
  await virtualMachineScaleSetUpdateInstancesMinimumSetGen();
}

main().catch(console.error);
