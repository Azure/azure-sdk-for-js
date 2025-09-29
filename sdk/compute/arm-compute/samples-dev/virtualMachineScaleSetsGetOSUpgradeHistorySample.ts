// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets list of OS upgrades on a VM scale set instance.
 *
 * @summary Gets list of OS upgrades on a VM scale set instance.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetOSUpgradeHistory_MaximumSet_Gen.json
 */
async function virtualMachineScaleSetGetOSUpgradeHistoryMaximumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.listOSUpgradeHistory(
    resourceGroupName,
    vmScaleSetName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

/**
 * This sample demonstrates how to Gets list of OS upgrades on a VM scale set instance.
 *
 * @summary Gets list of OS upgrades on a VM scale set instance.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_GetOSUpgradeHistory_MinimumSet_Gen.json
 */
async function virtualMachineScaleSetGetOSUpgradeHistoryMinimumSetGen(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "rgcompute";
  const vmScaleSetName = "aaaaaaaaaaaaaaaaaaaaaaaaaa";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.listOSUpgradeHistory(
    resourceGroupName,
    vmScaleSetName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualMachineScaleSetGetOSUpgradeHistoryMaximumSetGen();
  await virtualMachineScaleSetGetOSUpgradeHistoryMinimumSetGen();
}

main().catch(console.error);
