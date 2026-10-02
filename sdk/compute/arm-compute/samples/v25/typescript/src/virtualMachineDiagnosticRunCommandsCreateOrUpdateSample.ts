// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementClient } from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update the diagnostic run command.
 *
 * @summary the operation to create or update the diagnostic run command.
 * x-ms-original-file: 2026-04-01/diagnosticRunCommandExamples/VirtualMachineDiagnosticRunCommand_CreateOrUpdate.json
 */
async function createOrUpdateADiagnosticRunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.virtualMachineDiagnosticRunCommands.createOrUpdate(
    "myResourceGroup",
    "myVM",
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
        treatFailureAsDeploymentFailure: false,
        timeoutInSeconds: 3600,
      },
    },
  );
}

async function main(): Promise<void> {
  await createOrUpdateADiagnosticRunCommand();
}

main().catch(console.error);
