// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a specific volume on an Edge Machine.
 *
 * @summary get a specific volume on an Edge Machine.
 * x-ms-original-file: 2026-10-01/EdgeMachineVolumes_Get.json
 */
async function edgeMachineVolumesGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.edgeMachineVolumes.get("test-rg", "EdgeMachine01", "vol-001");
  console.log(result);
}

async function main() {
  await edgeMachineVolumesGet();
}

main().catch(console.error);
