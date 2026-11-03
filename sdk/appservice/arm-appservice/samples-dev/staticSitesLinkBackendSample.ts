// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to link backend to a static site
 *
 * @summary link backend to a static site
 * x-ms-original-file: 2025-05-01/LinkBackendToStaticSite.json
 */
async function linkABackendToAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.linkBackend("rg", "testStaticSite0", "testBackend", {
    backendResourceId:
      "/subscription/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/backendRg/providers/Microsoft.Web/sites/testBackend",
    region: "West US 2",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await linkABackendToAStaticSite();
}

main().catch(console.error);
