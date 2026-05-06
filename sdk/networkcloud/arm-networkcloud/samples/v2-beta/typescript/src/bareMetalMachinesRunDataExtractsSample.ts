// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloudClient } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to run one or more data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 *
 * @summary run one or more data extractions on the provided bare metal machine. The URL to storage account with the command execution results and the command exit code can be retrieved from the operation status API once available.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_RunDataExtracts.json
 */
async function runDataExtractionOnBareMetalMachine(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.runDataExtracts(
    "resourceGroupName",
    "bareMetalMachineName",
    {
      commands: [{ arguments: ["SysInfo", "TTYLog"], command: "hardware-support-data-collection" }],
      limitTimeSeconds: 60,
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await runDataExtractionOnBareMetalMachine();
}

main().catch(console.error);
