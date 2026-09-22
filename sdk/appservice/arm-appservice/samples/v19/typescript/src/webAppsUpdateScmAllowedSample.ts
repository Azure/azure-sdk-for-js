// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Updates whether user publishing credentials are allowed on the site or not.
 *
 * @summary description for Updates whether user publishing credentials are allowed on the site or not.
 * x-ms-original-file: 2025-05-01/UpdatePublishingCredentialsPolicy.json
 */
async function updateSCMAllowed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateScmAllowed("rg", "testSite", { allow: true });
  console.log(result);
}

async function main(): Promise<void> {
  await updateSCMAllowed();
}

main().catch(console.error);
