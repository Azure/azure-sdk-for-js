// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkCloud } = require("@azure/arm-networkcloud");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get properties of the provided virtual machine console.
 *
 * @summary get properties of the provided virtual machine console.
 * x-ms-original-file: 2026-05-01-preview/Consoles_Get.json
 */
async function getVirtualMachineConsole() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.consoles.get("resourceGroupName", "virtualMachineName", "default");
  console.log(result);
}

async function main() {
  await getVirtualMachineConsole();
}

main().catch(console.error);
