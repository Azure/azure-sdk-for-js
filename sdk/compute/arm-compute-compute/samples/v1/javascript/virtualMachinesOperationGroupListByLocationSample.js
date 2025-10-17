// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the virtual machines under the specified subscription for the specified location.
 *
 * @summary gets all the virtual machines under the specified subscription for the specified location.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ListBySubscription_ByLocation.json
 */
async function listsAllTheVirtualMachinesUnderTheSpecifiedSubscriptionForTheSpecifiedLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachinesOperationGroup.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listsAllTheVirtualMachinesUnderTheSpecifiedSubscriptionForTheSpecifiedLocation();
}

main().catch(console.error);
