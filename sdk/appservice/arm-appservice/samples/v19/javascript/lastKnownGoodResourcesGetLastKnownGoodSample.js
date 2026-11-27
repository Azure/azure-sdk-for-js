// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the last known good revision state for a Web App.
 *
 * @summary gets the last known good revision state for a Web App.
 * x-ms-original-file: 2026-08-01/LastKnownGoodResources_GetLastKnownGood.json
 */
async function getTheLastKnownGoodStateOfAWebApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.lastKnownGoodResources.getLastKnownGood("testrg123", "sitef6141");
  console.log(result);
}

async function main() {
  await getTheLastKnownGoodStateOfAWebApp();
}

main().catch(console.error);
