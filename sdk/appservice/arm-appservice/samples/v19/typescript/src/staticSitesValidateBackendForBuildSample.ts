// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to validates that a backend can be linked to a static site build
 *
 * @summary validates that a backend can be linked to a static site build
 * x-ms-original-file: 2025-05-01/ValidateLinkedBackendForStaticSiteBuild.json
 */
async function validateIfBackendCanBeLinkedToStaticSiteBuild(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.validateBackendForBuild(
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
}

async function main(): Promise<void> {
  await validateIfBackendCanBeLinkedToStaticSiteBuild();
}

main().catch(console.error);
