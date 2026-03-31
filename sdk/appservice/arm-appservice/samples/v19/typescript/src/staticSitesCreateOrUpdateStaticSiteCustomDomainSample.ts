// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates a new static site custom domain in an existing resource group and static site.
 *
 * @summary description for Creates a new static site custom domain in an existing resource group and static site.
 * x-ms-original-file: 2025-05-01/CreateOrUpdateStaticSiteCustomDomain.json
 */
async function createOrUpdateACustomDomainForAStaticSite(): Promise<void> {
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

async function main(): Promise<void> {
  await createOrUpdateACustomDomainForAStaticSite();
}

main().catch(console.error);
