// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Register a user provided function app with a static site
 *
 * @summary description for Register a user provided function app with a static site
 * x-ms-original-file: 2025-05-01/RegisterUserProvidedFunctionAppWithStaticSite.json
 */
async function registerAUserProvidedFunctionAppWithAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.registerUserProvidedFunctionAppWithStaticSite(
    "rg",
    "testStaticSite0",
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

async function main() {
  await registerAUserProvidedFunctionAppWithAStaticSite();
}

main().catch(console.error);
