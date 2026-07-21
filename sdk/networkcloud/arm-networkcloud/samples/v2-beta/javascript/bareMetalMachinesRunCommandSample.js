// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to run the command or the script on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @summary run the command or the script on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_RunCommand.json
 */
async function runCommandOnBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.runCommand(
    "resourceGroupName",
    "bareMetalMachineName",
    { arguments: ["--argument1", "argument2"], limitTimeSeconds: 60, script: "cHdkCg==" },
  );
  console.log(result);
}

async function main() {
  await runCommandOnBareMetalMachine();
}

main().catch(console.error);
