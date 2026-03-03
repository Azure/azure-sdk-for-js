// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Returns whether Scm basic auth is allowed on the site or not.
 *
 * @summary description for Returns whether Scm basic auth is allowed on the site or not.
 * x-ms-original-file: 2025-05-01/GetPublishingCredentialsPolicySlot.json
 */
async function getSCMAllowed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getScmAllowedSlot("rg", "testSite", "stage");
  console.log(result);
}

async function main(): Promise<void> {
  await getSCMAllowed();
}

main().catch(console.error);
