// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all available run commands for a subscription in a location.
 *
 * @summary lists all available run commands for a subscription in a location.
 * x-ms-original-file: 2025-04-01/runCommandExamples/RunCommand_List.json
 */
async function virtualMachineRunCommandList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subid";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineRunCommandsOperationGroup.list("SoutheastAsia")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualMachineRunCommandList();
}

main().catch(console.error);
