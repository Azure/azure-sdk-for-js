// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a volume from an Edge Machine.
 *
 * @summary delete a volume from an Edge Machine.
 * x-ms-original-file: 2026-10-01/EdgeMachineVolumes_Delete.json
 */
async function edgeMachineVolumesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.edgeMachineVolumes.delete("test-rg", "EdgeMachine01", "vol-001");
}

async function main() {
  await edgeMachineVolumesDelete();
}

main().catch(console.error);
