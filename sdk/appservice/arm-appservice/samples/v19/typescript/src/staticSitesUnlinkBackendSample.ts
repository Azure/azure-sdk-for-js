// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to unlink a backend from a static site
 *
 * @summary unlink a backend from a static site
 * x-ms-original-file: 2025-05-01/UnlinkBackendFromStaticSite.json
 */
async function unlinkABackendFromAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.unlinkBackend("rg", "testStaticSite0", "testBackend");
}

async function main(): Promise<void> {
  await unlinkABackendFromAStaticSite();
}

main().catch(console.error);
