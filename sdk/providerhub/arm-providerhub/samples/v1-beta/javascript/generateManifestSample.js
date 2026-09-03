// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to generates the manifest for the given provider.
 *
 * @summary generates the manifest for the given provider.
 * x-ms-original-file: 2024-09-01/GenerateManifest.json
 */
async function generateManifest() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.generateManifest("Microsoft.Contoso");
  console.log(result);
}

async function main() {
  await generateManifest();
}

main().catch(console.error);
