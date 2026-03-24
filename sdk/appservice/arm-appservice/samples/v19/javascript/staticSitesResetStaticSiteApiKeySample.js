// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Resets the api key for an existing static site.
 *
 * @summary description for Resets the api key for an existing static site.
 * x-ms-original-file: 2025-05-01/ResetStaticSiteApiKey.json
 */
async function resetTheApiKeyForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.resetStaticSiteApiKey("rg", "testStaticSite0", {
    repositoryToken: "repoToken123",
    shouldUpdateRepository: true,
  });
}

async function main() {
  await resetTheApiKeyForAStaticSite();
}

main().catch(console.error);
