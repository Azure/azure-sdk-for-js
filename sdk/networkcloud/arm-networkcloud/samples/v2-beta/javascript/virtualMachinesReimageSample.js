// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to reimage the provided virtual machine.
 *
 * @summary reimage the provided virtual machine.
 * x-ms-original-file: 2026-05-01-preview/VirtualMachines_Reimage.json
 */
async function reimageVirtualMachine() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.virtualMachines.reimage("resourceGroupName", "virtualMachineName");
  console.log(result);
}

async function main() {
  await reimageVirtualMachine();
}

main().catch(console.error);
