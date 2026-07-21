// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @summary run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_RunReadCommands_Hostname.json
 */
async function runAndRetrieveOutputFromASingleReadOnlyCommandOnBareMetalMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.runReadCommands(
    "resourceGroupName",
    "bareMetalMachineName",
    { commands: [{ command: "hostname" }], limitTimeSeconds: 60 },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @summary run one or more read-only commands on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_RunReadCommands_Multiple.json
 */
async function runAndRetrieveOutputFromReadOnlyCommandsOnBareMetalMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.runReadCommands(
    "resourceGroupName",
    "bareMetalMachineName",
    {
      commands: [
        { arguments: ["pods", "-A"], command: "kubectl get" },
        { arguments: ["192.168.0.99", "-c", "3"], command: "ping" },
      ],
      limitTimeSeconds: 60,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await runAndRetrieveOutputFromASingleReadOnlyCommandOnBareMetalMachine();
  await runAndRetrieveOutputFromReadOnlyCommandsOnBareMetalMachine();
}

main().catch(console.error);
