// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Returns whether FTP is allowed on the site or not.
 *
 * @summary description for Returns whether FTP is allowed on the site or not.
 * x-ms-original-file: 2025-05-01/GetPublishingCredentialsPolicySlot_FtpAllowedSlot.json
 */
async function getFTPAllowed(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getFtpAllowedSlot("rg", "testSite", "stage");
  console.log(result);
}

async function main(): Promise<void> {
  await getFTPAllowed();
}

main().catch(console.error);
