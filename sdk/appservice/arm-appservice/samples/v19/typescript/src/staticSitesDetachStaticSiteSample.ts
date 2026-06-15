// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Detaches a static site.
 *
 * @summary description for Detaches a static site.
 * x-ms-original-file: 2025-05-01/DetachStaticSite.json
 */
async function detachAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.detachStaticSite("rg", "testStaticSite0");
}

async function main(): Promise<void> {
  await detachAStaticSite();
}

main().catch(console.error);
