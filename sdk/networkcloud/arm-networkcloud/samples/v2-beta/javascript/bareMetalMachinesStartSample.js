// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to start the provided bare metal machine.
 *
 * @summary start the provided bare metal machine.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Start.json
 */
async function startBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.bareMetalMachines.start("resourceGroupName", "bareMetalMachineName");
  console.log(result);
}

async function main() {
  await startBareMetalMachine();
}

main().catch(console.error);
