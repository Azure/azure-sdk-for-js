// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected.
 *
 * @summary starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_StartOSUpgrade_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeStartOSUpgradeMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.startOSUpgrade("rgcompute", "aaaa");
  console.log(result);
}

/**
 * This sample demonstrates how to starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected.
 *
 * @summary starts a rolling upgrade to move all virtual machine scale set instances to the latest available Platform Image OS version. Instances which are already running the latest available OS version are not affected.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSetRollingUpgrade_StartOSUpgrade_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetRollingUpgradeStartOSUpgradeMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineScaleSets.startOSUpgrade(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaa",
  );
  console.log(result);
}

async function main() {
  await virtualMachineScaleSetRollingUpgradeStartOSUpgradeMaximumSetGen();
  await virtualMachineScaleSetRollingUpgradeStartOSUpgradeMinimumSetGen();
}

main().catch(console.error);
