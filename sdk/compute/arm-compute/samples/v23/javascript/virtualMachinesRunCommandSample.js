// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Run command on the VM.
 *
 * @summary Run command on the VM.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/ComputeRP/stable/2025-04-01/examples/runCommandExamples/VirtualMachineRunCommand.json
 */
async function virtualMachineRunCommand() {
  const subscriptionId =
    process.env["COMPUTE_SUBSCRIPTION_ID"] || "24fb23e3-6ba3-41f0-9b6e-e41131d5d61e";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "crptestar98131";
  const vmName = "vm3036";
  const parameters = { commandId: "RunPowerShellScript" };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.virtualMachines.beginRunCommandAndWait(
    resourceGroupName,
    vmName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await virtualMachineRunCommand();
}

main().catch(console.error);
