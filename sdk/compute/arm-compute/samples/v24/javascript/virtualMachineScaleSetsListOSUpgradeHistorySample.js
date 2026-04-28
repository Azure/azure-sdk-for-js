// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets list of OS upgrades on a VM scale set instance.
 *
 * @summary gets list of OS upgrades on a VM scale set instance.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetOSUpgradeHistory_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetGetOSUpgradeHistoryMaximumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.listOSUpgradeHistory(
    "rgcompute",
    "aaaaaa",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

/**
 * This sample demonstrates how to gets list of OS upgrades on a VM scale set instance.
 *
 * @summary gets list of OS upgrades on a VM scale set instance.
 * x-ms-original-file: 2025-11-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetOSUpgradeHistory_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetGetOSUpgradeHistoryMinimumSetGen() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.listOSUpgradeHistory(
    "rgcompute",
    "aaaaaaaaaaaaaaaaaaaaaaaaaa",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await virtualMachineScaleSetGetOSUpgradeHistoryMaximumSetGen();
  await virtualMachineScaleSetGetOSUpgradeHistoryMinimumSetGen();
}

main().catch(console.error);
