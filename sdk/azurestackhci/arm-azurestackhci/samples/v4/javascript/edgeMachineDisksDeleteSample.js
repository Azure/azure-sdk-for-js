// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a disk from an Edge Machine.
 *
 * @summary delete a disk from an Edge Machine.
 * x-ms-original-file: 2026-10-01/EdgeMachineDisks_Delete.json
 */
async function edgeMachineDisksDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineDisks.delete("test-rg", "EdgeMachine01", "disk-001");
}

async function main() {
  await edgeMachineDisksDelete();
}

main().catch(console.error);
