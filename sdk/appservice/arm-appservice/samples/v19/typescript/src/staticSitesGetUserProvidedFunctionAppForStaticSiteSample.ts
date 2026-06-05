// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets the details of the user provided function app registered with a static site
 *
 * @summary description for Gets the details of the user provided function app registered with a static site
 * x-ms-original-file: 2025-05-01/GetUserProvidedFunctionAppForStaticSite.json
 */
async function getDetailsOfTheUserProvidedFunctionAppRegisteredWithAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getUserProvidedFunctionAppForStaticSite(
    "rg",
    "testStaticSite0",
    "testFunctionApp",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheUserProvidedFunctionAppRegisteredWithAStaticSite();
}

main().catch(console.error);
