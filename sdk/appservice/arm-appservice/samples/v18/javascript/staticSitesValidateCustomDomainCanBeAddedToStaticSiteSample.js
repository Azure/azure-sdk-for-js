// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Validates a particular custom domain can be added to a static site.
 *
 * @summary description for Validates a particular custom domain can be added to a static site.
 * x-ms-original-file: 2025-05-01/ValidateStaticSiteCustomDomain.json
 */
async function validateACustomDomainForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.validateCustomDomainCanBeAddedToStaticSite(
    "rg",
    "testStaticSite0",
    "custom.domain.net",
    {},
  );
}

async function main() {
  await validateACustomDomainForAStaticSite();
}

main().catch(console.error);
