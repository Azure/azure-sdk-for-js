// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists the last known good revision state for a Web App.
 *
 * @summary lists the last known good revision state for a Web App.
 * x-ms-original-file: 2026-08-01/LastKnownGoodResources_ListLastKnownGoods.json
 */
async function listTheLastKnownGoodStateOfAWebApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.lastKnownGoodResources.listLastKnownGoods(
    "testrg123",
    "sitef6141",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listTheLastKnownGoodStateOfAWebApp();
}

main().catch(console.error);
