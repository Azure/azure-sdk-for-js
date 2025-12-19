// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get an edge machine.
 *
 * @summary get an edge machine.
 * x-ms-original-file: 2025-12-01-preview/EdgeMachines_Get.json
 */
async function edgeMachinesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachines.get("ArcInstance-rg", "machine-1");
  console.log(result);
}

async function main() {
  await edgeMachinesGetMaximumSet();
}

main().catch(console.error);
