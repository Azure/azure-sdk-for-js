// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to create or update the run command.
 *
 * @summary The operation to create or update the run command.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2024-11-01/examples/runCommandExamples/VirtualMachineRunCommand_CreateOrUpdate.json
 */

import {
  VirtualMachineRunCommand,
  ComputeManagementClient,
} from "@azure/arm-compute";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function createOrUpdateARunCommand(): Promise<void> {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName =
    process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const vmName = "myVM";
  const runCommandName = "myRunCommand";
  const runCommand: VirtualMachineRunCommand = {
    asyncExecution: false,
    errorBlobUri:
      "https://mystorageaccount.blob.core.windows.net/scriptcontainer/scriptURI",
    location: "West US",
    outputBlobManagedIdentity: {
      clientId: "22d35efb-0c99-4041-8c5b-6d24db33a69a",
    },
    outputBlobUri:
      "https://mystorageaccount.blob.core.windows.net/myscriptoutputcontainer/MyScriptoutput.txt",
    parameters: [
      { name: "param1", value: "value1" },
      { name: "param2", value: "value2" },
    ],
    runAsPassword: "<runAsPassword>",
    runAsUser: "user1",
    source: {
      scriptUri:
        "https://mystorageaccount.blob.core.windows.net/scriptcontainer/scriptURI",
    },
    timeoutInSeconds: 3600,
    treatFailureAsDeploymentFailure: false,
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result =
    await client.virtualMachineRunCommands.beginCreateOrUpdateAndWait(
      resourceGroupName,
      vmName,
      runCommandName,
      runCommand,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateARunCommand();
}

main().catch(console.error);
