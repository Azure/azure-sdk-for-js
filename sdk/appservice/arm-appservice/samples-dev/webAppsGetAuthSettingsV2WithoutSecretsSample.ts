// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets site's Authentication / Authorization settings for apps via the V2 format
 *
 * @summary description for Gets site's Authentication / Authorization settings for apps via the V2 format
 * x-ms-original-file: 2025-05-01/GetAuthSettingsV2WithoutSecrets.json
 */
async function listAuthSettingsWithoutSecrets(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getAuthSettingsV2WithoutSecrets("testrg123", "sitef6141");
  console.log(result);
}

async function main(): Promise<void> {
  await listAuthSettingsWithoutSecrets();
}

main().catch(console.error);
