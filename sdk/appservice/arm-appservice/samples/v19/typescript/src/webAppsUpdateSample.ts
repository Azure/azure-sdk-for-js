// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app.
 *
 * @summary description for Creates a new web, mobile, or API app in an existing resource group, or updates an existing app.
 * x-ms-original-file: 2025-05-01/UpdateWebApp.json
 */
async function updateWebApp(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.update("testrg123", "sitef6141", {
    serverFarmId:
      "/subscriptions/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/testrg123/providers/Microsoft.Web/serverfarms/DefaultAsp",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await updateWebApp();
}

main().catch(console.error);
