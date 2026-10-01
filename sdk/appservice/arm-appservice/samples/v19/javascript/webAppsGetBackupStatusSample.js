// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets a backup of an app by its ID.
 *
 * @summary description for Gets a backup of an app by its ID.
 * x-ms-original-file: 2025-05-01/GetWebAppBackup.json
 */
async function getWebAppBackup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getBackupStatus("testrg123", "sitef6141", "12345");
  console.log(result);
}

async function main() {
  await getWebAppBackup();
}

main().catch(console.error);
