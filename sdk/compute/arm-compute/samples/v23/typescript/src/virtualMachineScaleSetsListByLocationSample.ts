// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets all the VM scale sets under the specified subscription for the specified location.
 *
 * @summary Gets all the VM scale sets under the specified subscription for the specified location.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ListBySubscription_ByLocation.json
 */
async function listsAllTheVMScaleSetsUnderTheSpecifiedSubscriptionForTheSpecifiedLocation(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const location = "eastus";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSets.listByLocation(
    location,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllTheVMScaleSetsUnderTheSpecifiedSubscriptionForTheSpecifiedLocation();
}

main().catch(console.error);
