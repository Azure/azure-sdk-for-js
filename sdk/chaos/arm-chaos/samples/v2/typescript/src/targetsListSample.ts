// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementClient } from "@azure/arm-chaos";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a list of Target resources that extend a tracked regional resource.
 *
 * @summary get a list of Target resources that extend a tracked regional resource.
 * x-ms-original-file: 2025-01-01/Targets_List.json
 */
async function listAllTargetsThatExtendAVirtualMachineResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "6b052e15-03d3-4f17-b2e1-be7f07588291";
  const client = new ChaosManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.targets.list(
    "exampleRG",
    "Microsoft.Compute",
    "virtualMachines",
    "exampleVM",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listAllTargetsThatExtendAVirtualMachineResource();
}

main().catch(console.error);
