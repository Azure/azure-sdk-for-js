// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets all the virtual machines under the specified subscription for the specified location.
 *
 * @summary gets all the virtual machines under the specified subscription for the specified location.
 * x-ms-original-file: 2025-04-01/virtualMachineExamples/VirtualMachine_ListBySubscription_ByLocation.json
 */
async function listsAllTheVirtualMachinesUnderTheSpecifiedSubscriptionForTheSpecifiedLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new ComputeClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachinesOperationGroup.listByLocation("eastus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listsAllTheVirtualMachinesUnderTheSpecifiedSubscriptionForTheSpecifiedLocation();
}

main().catch(console.error);
