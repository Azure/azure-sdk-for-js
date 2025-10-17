// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update the run command.
 *
 * @summary the operation to create or update the run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineRunCommand_CreateOrUpdate.json
 */
async function createOrUpdateARunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineRunCommands.createOrUpdate("myResourceGroup", "myVM", "myRunCommand", {
    location: "West US",
    properties: {
      source: {
        scriptUri: "https://mystorageaccount.blob.core.windows.net/scriptcontainer/scriptURI",
      },
      parameters: [
        { name: "param1", value: "value1" },
        { name: "param2", value: "value2" },
      ],
      asyncExecution: false,
      treatFailureAsDeploymentFailure: false,
      runAsUser: "user1",
      runAsPassword: "<runAsPassword>",
      timeoutInSeconds: 3600,
      outputBlobUri:
        "https://mystorageaccount.blob.core.windows.net/myscriptoutputcontainer/MyScriptoutput.txt",
      errorBlobUri: "https://mystorageaccount.blob.core.windows.net/scriptcontainer/scriptURI",
      outputBlobManagedIdentity: {
        clientId: "22d35efb-0c99-4041-8c5b-6d24db33a69a",
      },
    },
  });
}

async function main(): Promise<void> {
  await createOrUpdateARunCommand();
}

main().catch(console.error);
