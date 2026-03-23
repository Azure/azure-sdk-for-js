// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to resync the connected registry instance.
 *
 * @summary resync the connected registry instance.
 * x-ms-original-file: 2026-01-01-preview/ConnectedRegistryResync.json
 */
async function connectedRegistryResync() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  const result = await client.connectedRegistries.resync(
    "myResourceGroup",
    "myRegistry",
    "myConnectedRegistry",
  );
  console.log(result);
}

async function main() {
  await connectedRegistryResync();
}

main().catch(console.error);
