// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeClient } = require("@azure/arm-compute-compute");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to run command on the VM.
 *
 * @summary run command on the VM.
 * x-ms-original-file: 2025-04-01/runCommandExamples/VirtualMachineRunCommand.json
 */
async function virtualMachineRunCommand() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "24fb23e3-6ba3-41f0-9b6e-e41131d5d61e";
  const client = new ComputeClient(credential, subscriptionId);
  const result = await client.virtualMachines.runCommand("crptestar98131", "vm3036", {
    commandId: "RunPowerShellScript",
  });
  console.log(result);
}

async function main() {
  await virtualMachineRunCommand();
}

main().catch(console.error);
