// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Description for Gets the details of the user provided function app registered with a static site
 *
 * @summary Description for Gets the details of the user provided function app registered with a static site
 * x-ms-original-file: specification/web/resource-manager/Microsoft.Web/stable/2024-11-01/examples/GetUserProvidedFunctionAppForStaticSite.json
 */

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getDetailsOfTheUserProvidedFunctionAppRegisteredWithAStaticSite(): Promise<void> {
  const subscriptionId =
    process.env["APPSERVICE_SUBSCRIPTION_ID"] ||
    "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const resourceGroupName = process.env["APPSERVICE_RESOURCE_GROUP"] || "rg";
  const name = "testStaticSite0";
  const functionAppName = "testFunctionApp";
  const credential = new DefaultAzureCredential();
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result =
    await client.staticSites.getUserProvidedFunctionAppForStaticSite(
      resourceGroupName,
      name,
      functionAppName,
    );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheUserProvidedFunctionAppRegisteredWithAStaticSite();
}

main().catch(console.error);
