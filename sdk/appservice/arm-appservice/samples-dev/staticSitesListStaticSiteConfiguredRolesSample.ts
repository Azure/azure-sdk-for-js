// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Lists the roles configured for the static site.
 *
 * @summary Description for Lists the roles configured for the static site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/ListStaticSiteConfiguredRoles.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function listsTheConfiguredRolesForAStaticSite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.listStaticSiteConfiguredRoles(
    resourceGroupName,
    name,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await listsTheConfiguredRolesForAStaticSite();
}

main().catch(console.error);
