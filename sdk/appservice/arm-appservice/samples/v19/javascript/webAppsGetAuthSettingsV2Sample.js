// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets site's Authentication / Authorization settings for apps via the V2 format
 *
 * @summary description for Gets site's Authentication / Authorization settings for apps via the V2 format
 * x-ms-original-file: 2025-05-01/ListAuthSettingsV2.json
 */
async function listAuthSettingsV2() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getAuthSettingsV2("testrg123", "sitef6141");
  console.log(result);
}

async function main() {
  await listAuthSettingsV2();
}

main().catch(console.error);
