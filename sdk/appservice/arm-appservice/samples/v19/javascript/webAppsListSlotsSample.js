// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets an app's deployment slots.
 *
 * @summary description for Gets an app's deployment slots.
 * x-ms-original-file: 2025-05-01/ListWebAppSlots.json
 */
async function listWebAppSlots() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.webApps.listSlots("testrg123", "sitef6141")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listWebAppSlots();
}

main().catch(console.error);
