// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to link backend to a static site build
 *
 * @summary link backend to a static site build
 * x-ms-original-file: 2025-05-01/LinkBackendToStaticSiteBuild.json
 */
async function linkABackendToAStaticSiteBuild() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.linkBackendToBuild(
    "rg",
    "testStaticSite0",
    "default",
    "testBackend",
    {
      backendResourceId:
        "/subscription/34adfa4f-cedf-4dc0-ba29-b6d1a69ab345/resourceGroups/backendRg/providers/Microsoft.Web/sites/testBackend",
      region: "West US 2",
    },
  );
  console.log(result);
}

async function main() {
  await linkABackendToAStaticSiteBuild();
}

main().catch(console.error);
