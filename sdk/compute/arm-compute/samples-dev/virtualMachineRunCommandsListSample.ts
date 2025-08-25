// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Lists all available run commands for a subscription in a location.
 *
 * @summary Lists all available run commands for a subscription in a location.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/runCommandExamples/RunCommand_List.json
 */

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function virtualMachineRunCommandList(): Promise<void> {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "subid";
  const location = "SoutheastAsia";
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineRunCommands.list(location)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await virtualMachineRunCommandList();
}

main().catch(console.error);
