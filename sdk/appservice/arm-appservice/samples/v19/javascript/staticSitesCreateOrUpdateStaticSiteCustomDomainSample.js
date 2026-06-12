// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Creates a new static site custom domain in an existing resource group and static site.
 *
 * @summary description for Creates a new static site custom domain in an existing resource group and static site.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateStaticSiteCustomDomain.json
 */
async function createOrUpdateACustomDomainForAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.createOrUpdateStaticSiteCustomDomain(
    "rg",
    "testStaticSite0",
    "custom.domain.net",
    {},
  );
  console.log(result);
}

async function main() {
  await createOrUpdateACustomDomainForAStaticSite();
}

main().catch(console.error);
