// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to returns the details of a linked backend linked to a static site by name
 *
 * @summary returns the details of a linked backend linked to a static site by name
 * x-ms-original-file: 2025-05-01/GetLinkedBackendForStaticSite.json
 */
async function getDetailsOfTheLinkedBackendRegisteredWithAStaticSiteByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.staticSites.getLinkedBackend("rg", "testStaticSite0", "testBackend");
  console.log(result);
}

async function main(): Promise<void> {
  await getDetailsOfTheLinkedBackendRegisteredWithAStaticSiteByName();
}

main().catch(console.error);
