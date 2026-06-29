// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Deletes a custom domain.
 *
 * @summary description for Deletes a custom domain.
 * x-ms-original-file: 2025-05-01/DeleteStaticSiteCustomDomain.json
 */
async function deleteACustomDomainForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.deleteStaticSiteCustomDomain(
    "rg",
    "testStaticSite0",
    "custom.domain.net",
  );
}

async function main() {
  await deleteACustomDomainForAStaticSite();
}

main().catch(console.error);
