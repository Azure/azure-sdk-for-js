// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the VM scale sets under the specified subscription for the specified location.
 *
 * @summary gets all the VM scale sets under the specified subscription for the specified location.
 * x-ms-original-file: 2025-04-01/virtualMachineScaleSetExamples/VirtualMachineScaleSet_ListBySubscription_ByLocation.json
 */
async function listsAllTheVMScaleSetsUnderTheSpecifiedSubscriptionForTheSpecifiedLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetsOperationGroup.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllTheVMScaleSetsUnderTheSpecifiedSubscriptionForTheSpecifiedLocation();
}

main().catch(console.error);
