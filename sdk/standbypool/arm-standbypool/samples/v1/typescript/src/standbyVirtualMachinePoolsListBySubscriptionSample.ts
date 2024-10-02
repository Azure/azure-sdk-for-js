// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StandbyPoolManagementClient } from "@azure/arm-standbypool";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list StandbyVirtualMachinePoolResource resources by subscription ID
 *
 * @summary list StandbyVirtualMachinePoolResource resources by subscription ID
 * x-ms-original-file: 2024-03-01/StandbyVirtualMachinePools_ListBySubscription.json
 */
async function standbyVirtualMachinePoolsListBySubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000009";
  const client = new StandbyPoolManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (let item of client.standbyVirtualMachinePools.listBySubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  standbyVirtualMachinePoolsListBySubscription();
}

main().catch(console.error);
