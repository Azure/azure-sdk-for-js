// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Deletes a backup of an app by its ID.
 *
 * @summary description for Deletes a backup of an app by its ID.
 * x-ms-original-file: 2025-05-01/DeleteWebAppBackup.json
 */
async function deleteWebAppBackup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.deleteBackup("testrg123", "sitef6141", "12345");
}

async function main(): Promise<void> {
  await deleteWebAppBackup();
}

main().catch(console.error);
