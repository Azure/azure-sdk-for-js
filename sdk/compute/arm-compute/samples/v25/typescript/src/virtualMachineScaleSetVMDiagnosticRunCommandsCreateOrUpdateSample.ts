// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update the VMSS VM diagnostic run command.
 *
 * @summary the operation to create or update the VMSS VM diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineScaleSetVMDiagnosticRunCommand_CreateOrUpdate.json
 */
async function createVirtualMachineScaleSetVMDiagnosticRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineScaleSetVMDiagnosticRunCommands.createOrUpdate(
    "myResourceGroup",
    "myvmScaleSet",
    "0",
    "myRunCommand",
    {
      location: "West US",
      properties: {
        source: { commandId: "FleetDiagnosticsWindows" },
        parameters: [
          { name: "param1", value: "value1" },
          { name: "param2", value: "value2" },
        ],
        asyncExecution: false,
        treatFailureAsDeploymentFailure: true,
        runAsPassword: "<runAsPassword>",
        timeoutInSeconds: 3600,
      },
    },
  );
}

async function main(): Promise<void> {
  await createVirtualMachineScaleSetVMDiagnosticRunCommand();
}

main().catch(console.error);
