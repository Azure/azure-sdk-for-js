// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to run one or more read-only commands on the provided storage appliance.
 *
 * @summary run one or more read-only commands on the provided storage appliance.
 * x-ms-original-file: 2026-05-01-preview/StorageAppliances_RunReadCommands.json
 */
async function runAndRetrieveOutputFromReadOnlyCommandsOnStorageAppliance() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.storageAppliances.runReadCommands(
    "resourceGroupName",
    "storageApplianceName",
    {
      commands: [{ arguments: ["list", "--filter", "state='open'"], command: "purealert" }],
      limitTimeSeconds: 60,
    },
  );
  console.log(result);
}

async function main() {
  await runAndRetrieveOutputFromReadOnlyCommandsOnStorageAppliance();
}

main().catch(console.error);
