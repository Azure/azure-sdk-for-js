// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhci");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create Aad identity for arc settings.
 *
 * @summary create Aad identity for arc settings.
 * x-ms-original-file: 2025-12-01-preview/CreateArcIdentity.json
 */
async function createArcIdentity() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.arcSettings.createIdentity("test-rg", "myCluster", "default");
  console.log(result);
}

async function main() {
  await createArcIdentity();
}

main().catch(console.error);
