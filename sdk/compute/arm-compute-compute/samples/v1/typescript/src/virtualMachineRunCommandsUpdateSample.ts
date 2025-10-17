// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeClient } from "@azure/arm-compute-compute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to update the run command.
 *
 * @summary the operation to update the run command.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineRunCommand_Update.json
 */
async function updateARunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeClient(credential, subscriptionId);
  await client.virtualMachineRunCommands.update("myResourceGroup", "myVM", "myRunCommand", {
    properties: {
      source: {
        script: "Write-Host Hello World! ; Remove-Item C:\test\testFile.txt",
      },
      parameters: [
        { name: "param1", value: "value1" },
        { name: "param2", value: "value2" },
      ],
      asyncExecution: false,
      runAsUser: "user1",
      runAsPassword: "<runAsPassword>",
      timeoutInSeconds: 3600,
      outputBlobUri:
        "https://mystorageaccount.blob.core.windows.net/myscriptoutputcontainer/outputUri",
      errorBlobUri: "https://mystorageaccount.blob.core.windows.net/mycontainer/MyScriptError.txt",
      errorBlobManagedIdentity: {
        objectId: "4231e4d2-33e4-4e23-96b2-17888afa6072",
      },
    },
  });
}

async function main(): Promise<void> {
  await updateARunCommand();
}

main().catch(console.error);
