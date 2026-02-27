// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to returns details of all backends linked to a static site
 *
 * @summary returns details of all backends linked to a static site
 * x-ms-original-file: 2025-05-01/GetLinkedBackendsForStaticSite.json
 */
async function getDetailsOfTheLinkedBackendsRegisteredWithAStaticSite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.staticSites.getLinkedBackends("rg", "testStaticSite0")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getDetailsOfTheLinkedBackendsRegisteredWithAStaticSite();
}

main().catch(console.error);
