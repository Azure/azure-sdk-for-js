// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to The operation to update the run command.
 *
 * @summary The operation to update the run command.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/runCommandExamples/VirtualMachineRunCommand_Update.json
 */
async function updateARunCommand() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmName = "myVM";
  const runCommandName = "myRunCommand";
  const runCommand = {
    asyncExecution: false,
    errorBlobManagedIdentity: {
      objectId: "4231e4d2-33e4-4e23-96b2-17888afa6072",
    },
    errorBlobUri: "https://mystorageaccount.blob.core.windows.net/mycontainer/MyScriptError.txt",
    outputBlobUri:
      "https://mystorageaccount.blob.core.windows.net/myscriptoutputcontainer/outputUri",
    parameters: [
      { name: "param1", value: "value1" },
      { name: "param2", value: "value2" },
    ],
    runAsPassword: "<runAsPassword>",
    runAsUser: "user1",
    source: {
      script: "Write-Host Hello World! ; Remove-Item C:\test\testFile.txt",
    },
    timeoutInSeconds: 3600,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachineRunCommands.beginUpdateAndWait(
    resourceGroupName,
    vmName,
    runCommandName,
    runCommand,
  );
  console.log(result);
}

async function main() {
  await updateARunCommand();
}

main().catch(console.error);
