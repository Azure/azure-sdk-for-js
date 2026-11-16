// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete the diagnostic run command.
 *
 * @summary the operation to delete the diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineDiagnosticRunCommand_Delete.json
 */
async function deleteADiagnosticRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineDiagnosticRunCommands.delete(
    "myResourceGroup",
    "myVM",
    "myRunCommand",
  );
}

async function main(): Promise<void> {
  await deleteADiagnosticRunCommand();
}

main().catch(console.error);
