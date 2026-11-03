// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get the diagnostic run command.
 *
 * @summary the operation to get the diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineDiagnosticRunCommand_Get.json
 */
async function getADiagnosticRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineDiagnosticRunCommands.getByVirtualMachine(
    "myResourceGroup",
    "myVM",
    "myRunCommand",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getADiagnosticRunCommand();
}

main().catch(console.error);
