// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Cancels the current virtual machine scale set rolling upgrade.
 *
 * @summary Cancels the current virtual machine scale set rolling upgrade.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_Cancel_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeCancelMaximumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetRollingUpgrades.beginCancelAndWait(
    resourceGroupName,
    vmScaleSetName,
  );
  console.log(result);
}

/**
 * This sample demonstrates how to Cancels the current virtual machine scale set rolling upgrade.
 *
 * @summary Cancels the current virtual machine scale set rolling upgrade.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_Cancel_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeCancelMinimumSetGen() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSetRollingUpgrades.beginCancelAndWait(
    resourceGroupName,
    vmScaleSetName,
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetRollingUpgradeCancelMaximumSetGen();
  await virtualMachineScaleSetRollingUpgradeCancelMinimumSetGen();
}

main().catch(console.error);
