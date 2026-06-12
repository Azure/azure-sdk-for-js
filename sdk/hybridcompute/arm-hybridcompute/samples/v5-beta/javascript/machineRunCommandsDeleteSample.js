// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { HybridComputeManagementClient } = require("@azure/arm-hybridcompute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to delete a run command.
 *
 * @summary the operation to delete a run command.
 * x-ms-original-file: 2025-09-16-preview/runCommand/RunCommands_Delete.json
 */
async function deleteAMachineRunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscriptionId}";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  await client.machineRunCommands.delete("myResourceGroup", "myMachine", "myRunCommand");
}

async function main() {
  await deleteAMachineRunCommand();
}

main().catch(console.error);
