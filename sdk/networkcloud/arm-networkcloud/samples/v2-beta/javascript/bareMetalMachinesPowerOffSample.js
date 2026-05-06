// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to power off the provided bare metal machine.
 *
 * @summary power off the provided bare metal machine.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_PowerOff.json
 */
async function powerOffBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.powerOff(
    "resourceGroupName",
    "bareMetalMachineName",
    { bareMetalMachinePowerOffParameters: { skipShutdown: "True" } },
  );
  console.log(result);
}

async function main() {
  await powerOffBareMetalMachine();
}

main().catch(console.error);
