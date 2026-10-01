// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets the details of the user provided function app registered with a static site build
 *
 * @summary description for Gets the details of the user provided function app registered with a static site build
 * x-ms-original-file: 2025-05-01/GetUserProvidedFunctionAppForStaticSiteBuild.json
 */
async function getDetailsOfTheUserProvidedFunctionAppRegisteredWithAStaticSiteBuild(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getUserProvidedFunctionAppForStaticSiteBuild(
    "rg",
    "testStaticSite0",
    "default",
    "testFunctionApp",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheUserProvidedFunctionAppRegisteredWithAStaticSiteBuild();
}

main().catch(console.error);
