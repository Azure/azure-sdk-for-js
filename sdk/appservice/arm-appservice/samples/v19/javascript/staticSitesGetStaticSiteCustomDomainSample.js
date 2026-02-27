// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets an existing custom domain for a particular static site.
 *
 * @summary description for Gets an existing custom domain for a particular static site.
 * x-ms-original-file: 2025-05-01/GetStaticSiteCustomDomain.json
 */
async function getCustomDomainForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getStaticSiteCustomDomain(
    "rg",
    "testStaticSite0",
    "custom.domain.net",
  );
  console.log(result);
}

async function main() {
  await getCustomDomainForAStaticSite();
}

main().catch(console.error);
