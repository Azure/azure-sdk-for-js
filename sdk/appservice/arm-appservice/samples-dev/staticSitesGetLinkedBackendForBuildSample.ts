// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the details of a linked backend linked to a static site build by name
 *
 * @summary returns the details of a linked backend linked to a static site build by name
 * x-ms-original-file: 2025-05-01/GetLinkedBackendForStaticSiteBuild.json
 */
async function getDetailsOfTheLinkedBackendRegisteredWithAStaticSiteBuildByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getLinkedBackendForBuild(
    "rg",
    "testStaticSite0",
    "default",
    "testBackend",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheLinkedBackendRegisteredWithAStaticSiteBuildByName();
}

main().catch(console.error);
