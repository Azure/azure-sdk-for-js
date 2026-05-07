// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete the provided virtual machine console.
 *
 * @summary delete the provided virtual machine console.
 * x-ms-original-file: 2026-05-01-preview/Consoles_Delete.json
 */
async function deleteVirtualMachineConsole() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.consoles.delete("resourceGroupName", "virtualMachineName", "default");
  console.log(result);
}

async function main() {
  await deleteVirtualMachineConsole();
}

main().catch(console.error);
