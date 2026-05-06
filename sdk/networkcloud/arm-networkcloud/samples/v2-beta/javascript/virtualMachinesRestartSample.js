// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloudClient } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to restart the provided virtual machine.
 *
 * @summary restart the provided virtual machine.
 * x-ms-original-file: 2026-05-01-preview/VirtualMachines_Restart.json
 */
async function restartVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloudClient(credential, subscriptionId);
  const result = await client.virtualMachines.restart("resourceGroupName", "virtualMachineName");
  console.log(result);
}

async function main() {
  await restartVirtualMachine();
}

main().catch(console.error);
