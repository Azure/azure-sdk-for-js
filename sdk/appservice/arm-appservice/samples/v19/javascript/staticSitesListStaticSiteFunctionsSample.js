// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the functions of a static site.
 *
 * @summary description for Gets the functions of a static site.
 * x-ms-original-file: 2025-05-01/ListStaticSiteFunctions.json
 */
async function getsTheFunctionsOfAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.listStaticSiteFunctions("rg", "testStaticSite0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getsTheFunctionsOfAStaticSite();
}

main().catch(console.error);
