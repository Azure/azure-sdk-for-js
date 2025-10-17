// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the run command.
 *
 * @summary the operation to delete the run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineRunCommand_Delete.json
 */
async function deleteARunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineRunCommands.delete("myResourceGroup", "myVM", "myRunCommand");
}

async function main(): Promise<void> {
  await deleteARunCommand();
}

main().catch(console.error);
