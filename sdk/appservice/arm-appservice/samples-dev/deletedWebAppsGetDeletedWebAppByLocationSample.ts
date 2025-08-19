// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Get deleted app for a subscription at location.
 *
 * @summary Description for Get deleted app for a subscription at location.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetDeletedWebAppByLocation.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDeletedWebAppByLocation(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const location = "West US 2";
  const deletedSiteId = "9";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.deletedWebApps.getDeletedWebAppByLocation(
    location,
    deletedSiteId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDeletedWebAppByLocation();
}

main().catch(console.error);
