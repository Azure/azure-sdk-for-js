// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Updates a user entry with the listed roles
 *
 * @summary description for Updates a user entry with the listed roles
 * x-ms-original-file: 2025-05-01/UpdateStaticSiteUser.json
 */
async function createOrUpdateAUserForAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.updateStaticSiteUser(
    "rg",
    "testStaticSite0",
    "aad",
    "1234",
    { roles: "contributor" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await createOrUpdateAUserForAStaticSite();
}

main().catch(console.error);
