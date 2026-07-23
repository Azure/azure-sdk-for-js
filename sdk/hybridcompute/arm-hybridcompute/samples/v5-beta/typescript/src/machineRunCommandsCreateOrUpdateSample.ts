// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HybridComputeManagementClient } from "@azure/arm-hybridcompute";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to create or update a run command.
 *
 * @summary the operation to create or update a run command.
 * x-ms-original-file: 2026-06-16-preview/runCommand/RunCommands_CreateOrUpdate.json
 */
async function createOrUpdateARunCommand(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new HybridComputeManagementClient(credential, subscriptionId);
  const result = await client.machineRunCommands.createOrUpdate(
    "myResourceGroup",
    "myMachine",
    "myRunCommand",
    {
      location: "eastus2",
      asyncExecution: false,
      errorBlobUri: "https://mystorageaccount.blob.core.windows.net/mycontainer/MyScriptError.txt",
      outputBlobUri:
        "https://mystorageaccount.blob.core.windows.net/myscriptoutputcontainer/MyScriptoutput.txt",
      parameters: [
        { name: "param1", value: "value1" },
        { name: "param2", value: "value2" },
      ],
      runAsPassword: "<runAsPassword>",
      runAsUser: "user1",
      source: { script: "Write-Host Hello World!" },
      timeoutInSeconds: 3600,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateARunCommand();
}

main().catch(console.error);
