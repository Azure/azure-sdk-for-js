// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Detach the user provided function app from the static site
 *
 * @summary description for Detach the user provided function app from the static site
 * x-ms-original-file: 2025-05-01/DetachUserProvidedFunctionAppFromStaticSite.json
 */
async function detachTheUserProvidedFunctionAppFromTheStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.detachUserProvidedFunctionAppFromStaticSite(
    "rg",
    "testStaticSite0",
    "testFunctionApp",
  );
}

async function main() {
  await detachTheUserProvidedFunctionAppFromTheStaticSite();
}

main().catch(console.error);
