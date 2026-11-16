// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a volume on an Edge Machine.
 *
 * @summary create or update a volume on an Edge Machine.
 * x-ms-original-file: 2026-10-01/EdgeMachineVolumes_CreateOrUpdate.json
 */
async function edgeMachineVolumesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineVolumes.createOrUpdate(
    "test-rg",
    "EdgeMachine01",
    "vol-001",
    { properties: { volumeConfiguration: { reserved: "" } } },
  );
  console.log(result);
}

async function main() {
  await edgeMachineVolumesCreateOrUpdate();
}

main().catch(console.error);
