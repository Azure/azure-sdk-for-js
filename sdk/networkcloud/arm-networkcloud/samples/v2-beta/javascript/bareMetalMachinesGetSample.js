// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of the provided bare metal machine.
 *
 * @summary get properties of the provided bare metal machine.
 * x-ms-original-file: 2026-05-01-preview/BareMetalMachines_Get.json
 */
async function getBareMetalMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.bareMetalMachines.get("resourceGroupName", "bareMetalMachineName");
  console.log(result);
}

async function main() {
  await getBareMetalMachine();
}

main().catch(console.error);
