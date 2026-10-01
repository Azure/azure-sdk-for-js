// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get all apps for a subscription.
 *
 * @summary description for Get all apps for a subscription.
 * x-ms-original-file: 2025-05-01/ListWebApps.json
 */
async function listWebAppsForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWebAppsForSubscription();
}

main().catch(console.error);
