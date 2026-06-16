// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Register a user provided function app with a static site build
 *
 * @summary description for Register a user provided function app with a static site build
 * x-ms-original-file: 2025-05-01/RegisterUserProvidedFunctionAppWithStaticSiteBuild.json
 */
async function registerAUserProvidedFunctionAppWithAStaticSiteBuild(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.registerUserProvidedFunctionAppWithStaticSiteBuild(
    "rg",
    "testStaticSite0",
    "default",
    "testFunctionApp",
    {
      functionAppRegion: "West US 2",
      functionAppResourceId:
        "/subscription/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/functionRG/providers/Microsoft.Web/sites/testFunctionApp",
    },
    { isForced: true },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await registerAUserProvidedFunctionAppWithAStaticSiteBuild();
}

main().catch(console.error);
