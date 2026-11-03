// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to marks the current Web App state as last known good.
 *
 * @summary marks the current Web App state as last known good.
 * x-ms-original-file: 2026-08-01/LastKnownGoodResources_MarkLastKnownGood.json
 */
async function markTheCurrentStateOfAWebAppAsLastKnownGood() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.lastKnownGoodResources.markLastKnownGood("testrg123", "sitef6141");
  console.log(result);
}

async function main() {
  await markTheCurrentStateOfAWebAppAsLastKnownGood();
}

main().catch(console.error);
