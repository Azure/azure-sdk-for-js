// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to get all diagnostic run commands of an instance in Virtual Machine Scaleset.
 *
 * @summary the operation to get all diagnostic run commands of an instance in Virtual Machine Scaleset.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineScaleSetVMDiagnosticRunCommand_List.json
 */
async function listDiagnosticRunCommandsInVmssInstance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.virtualMachineScaleSetVMDiagnosticRunCommands.diagnosticList(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDiagnosticRunCommandsInVmssInstance();
}

main().catch(console.error);
