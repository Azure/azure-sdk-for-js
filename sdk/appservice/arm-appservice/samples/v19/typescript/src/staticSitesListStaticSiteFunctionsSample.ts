// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebSiteManagementClient } from "@azure/arm-appservice";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to description for Gets the functions of a static site.
 *
 * @summary description for Gets the functions of a static site.
 * x-ms-original-file: 2025-05-01/ListStaticSiteFunctions.json
 */
async function getsTheFunctionsOfAStaticSite(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.listStaticSiteFunctions("rg", "testStaticSite0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheFunctionsOfAStaticSite();
}

main().catch(console.error);
