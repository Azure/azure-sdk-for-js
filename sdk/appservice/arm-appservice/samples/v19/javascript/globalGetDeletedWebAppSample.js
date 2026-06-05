// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get deleted app for a subscription.
 *
 * @summary description for Get deleted app for a subscription.
 * x-ms-original-file: 2025-05-01/GetDeletedWebApp.json
 */
async function getDeletedWebApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.global.getDeletedWebApp("9");
  console.log(result);
}

async function main() {
  await getDeletedWebApp();
}

main().catch(console.error);
