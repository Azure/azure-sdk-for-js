// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Deletes a web, mobile, or API app, or one of the deployment slots.
 *
 * @summary description for Deletes a web, mobile, or API app, or one of the deployment slots.
 * x-ms-original-file: 2025-05-01/DeleteWebApp.json
 */
async function deleteWebApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.delete("testrg123", "sitef6141");
}

async function main(): Promise<void> {
  await deleteWebApp();
}

main().catch(console.error);
