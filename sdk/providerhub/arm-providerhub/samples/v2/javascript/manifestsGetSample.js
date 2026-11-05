// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the manifest from the manifest repository.
 *
 * @summary gets the manifest from the manifest repository.
 * x-ms-original-file: 2025-10-01/Manifests_Get.json
 */
async function manifestsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.manifests.get("Microsoft.Contoso", "prod");
  console.log(result);
}

async function main() {
  await manifestsGet();
}

main().catch(console.error);
