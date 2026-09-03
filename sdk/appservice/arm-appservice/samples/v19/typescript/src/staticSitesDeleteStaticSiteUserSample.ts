// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Deletes the user entry from the static site.
 *
 * @summary description for Deletes the user entry from the static site.
 * x-ms-original-file: 2025-05-01/DeleteStaticSiteUser.json
 */
async function deleteAUserForAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.deleteStaticSiteUser("rg", "testStaticSite0", "aad", "1234");
}

async function main(): Promise<void> {
  await deleteAUserForAStaticSite();
}

main().catch(console.error);
