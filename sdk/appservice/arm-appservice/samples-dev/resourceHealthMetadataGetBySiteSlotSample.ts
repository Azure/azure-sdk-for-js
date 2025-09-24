// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Gets the category of ResourceHealthMetadata to use for the given site
 *
 * @summary Description for Gets the category of ResourceHealthMetadata to use for the given site
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetResourceHealthMetadataBySite.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getResourceHealthMetadata(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "4adb32ad-8327-4cbb-b775-b84b4465bb38";
  const resourceGroupName =
    process.env["APPSERVICE_RESOURCE_GROUP"] || "Default-Web-NorthCentralUS";
  const name = "newsiteinnewASE-NCUS";
  const slot = "Production";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.resourceHealthMetadataOperations.getBySiteSlot(
    resourceGroupName,
    name,
    slot,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getResourceHealthMetadata();
}

main().catch(console.error);
