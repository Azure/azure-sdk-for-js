// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to get all diagnostic run commands of a Virtual Machine.
 *
 * @summary the operation to get all diagnostic run commands of a Virtual Machine.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineDiagnosticRunCommand_List.json
 */
async function listDiagnosticRunCommandsInAVirtualMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineDiagnosticRunCommands.diagnosticListByVirtualMachine(
    "myResourceGroup",
    "myVM",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listDiagnosticRunCommandsInAVirtualMachine();
}

main().catch(console.error);
