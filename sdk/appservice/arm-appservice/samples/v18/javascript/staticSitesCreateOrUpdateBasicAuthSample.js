// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Adds or updates basic auth for a static site.
 *
 * @summary description for Adds or updates basic auth for a static site.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateStaticSiteBasicAuth.json
 */
async function createsOrUpdatesBasicAuthPropertiesForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createOrUpdateBasicAuth(
    "rg",
    "testStaticSite0",
    "default",
    { applicableEnvironmentsMode: "AllEnvironments", password: "**********************" },
  );
  console.log(result);
}

async function main() {
  await createsOrUpdatesBasicAuthPropertiesForAStaticSite();
}

main().catch(console.error);
