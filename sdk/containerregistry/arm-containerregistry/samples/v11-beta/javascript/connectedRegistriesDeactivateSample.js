// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerRegistryManagementClient } = require("@azure/arm-containerregistry");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deactivates the connected registry instance.
 *
 * @summary deactivates the connected registry instance.
 * x-ms-original-file: 2025-05-01-preview/ConnectedRegistryDeactivate.json
 */
async function connectedRegistryDeactivate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerRegistryManagementClient(credential, subscriptionId);
  await client.connectedRegistries.deactivate(
    "myResourceGroup",
    "myRegistry",
    "myConnectedRegistry",
  );
}

async function main() {
  await connectedRegistryDeactivate();
}

main().catch(console.error);
