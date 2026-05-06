// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reimage the provided bare metal machine.
 *
 * @summary reimage the provided bare metal machine.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Reimage.json
 */
async function reimageBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.reimage(
    "resourceGroupName",
    "bareMetalMachineName",
    { body: { safeguardMode: "All" } },
  );
  console.log(result);
}

async function main() {
  await reimageBareMetalMachine();
}

main().catch(console.error);
