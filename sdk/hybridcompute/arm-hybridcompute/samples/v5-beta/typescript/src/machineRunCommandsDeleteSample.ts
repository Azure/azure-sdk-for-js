// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a run command.
 *
 * @summary the operation to delete a run command.
 * x-ms-original-file: 2026-06-16-preview/runCommand/RunCommands_Delete.json
 */
async function deleteAMachineRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.machineRunCommands.delete("myResourceGroup", "myMachine", "myRunCommand");
}

async function main(): Promise<void> {
  await deleteAMachineRunCommand();
}

main().catch(console.error);
