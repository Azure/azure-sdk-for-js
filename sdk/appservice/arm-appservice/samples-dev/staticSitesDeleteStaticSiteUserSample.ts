// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Deletes the user entry from the static site.
 *
 * @summary Description for Deletes the user entry from the static site.
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/DeleteStaticSiteUser.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteAUserForAStaticSite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const authprovider = "aad";
  const userid = "1234";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.deleteStaticSiteUser(
    resourceGroupName,
    name,
    authprovider,
    userid,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteAUserForAStaticSite();
}

main().catch(console.error);
