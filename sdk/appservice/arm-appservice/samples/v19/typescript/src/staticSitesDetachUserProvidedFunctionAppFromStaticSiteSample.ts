// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Detach the user provided function app from the static site
 *
 * @summary description for Detach the user provided function app from the static site
 * x-ms-original-file: 2025-05-01/DetachUserProvidedFunctionAppFromStaticSite.json
 */
async function detachTheUserProvidedFunctionAppFromTheStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.staticSites.detachUserProvidedFunctionAppFromStaticSite(
    "rg",
    "testStaticSite0",
    "testFunctionApp",
  );
}

async function main(): Promise<void> {
  await detachTheUserProvidedFunctionAppFromTheStaticSite();
}

main().catch(console.error);
