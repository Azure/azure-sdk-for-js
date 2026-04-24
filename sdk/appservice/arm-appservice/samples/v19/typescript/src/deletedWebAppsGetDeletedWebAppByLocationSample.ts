// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Get deleted app for a subscription at location.
 *
 * @summary description for Get deleted app for a subscription at location.
 * x-ms-original-file: 2025-05-01/GetDeletedWebAppByLocation.json
 */
async function getDeletedWebAppByLocation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.deletedWebApps.getDeletedWebAppByLocation("West US 2", "9");
  console.log(result);
}

async function main(): Promise<void> {
  await getDeletedWebAppByLocation();
}

main().catch(console.error);
