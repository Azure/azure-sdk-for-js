// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Updates whether FTP is allowed on the site or not.
 *
 * @summary description for Updates whether FTP is allowed on the site or not.
 * x-ms-original-file: 2025-05-01/UpdatePublishingCredentialsPolicy_UpdateFtpAllowed.json
 */
async function updateFTPAllowed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.updateFtpAllowed("rg", "testSite", { allow: true });
  console.log(result);
}

async function main(): Promise<void> {
  await updateFTPAllowed();
}

main().catch(console.error);
