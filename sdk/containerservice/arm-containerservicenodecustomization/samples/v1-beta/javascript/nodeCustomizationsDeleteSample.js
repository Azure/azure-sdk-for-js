// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerServiceClient } = require("@azure/arm-containerservicenodecustomization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a node customization. This operation will be blocked if the resource is in use.
 *
 * @summary delete a node customization. This operation will be blocked if the resource is in use.
 * x-ms-original-file: 2025-09-02-preview/NodeCustomizations_Delete.json
 */
async function nodeCustomizationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerServiceClient(credential, subscriptionId);
  await client.nodeCustomizations.delete("rg1", "my-node-customization");
}

async function main() {
  await nodeCustomizationsDelete();
}

main().catch(console.error);
