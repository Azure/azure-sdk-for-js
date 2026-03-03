// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Get all deleted apps for a subscription at location
 *
 * @summary description for Get all deleted apps for a subscription at location
 * x-ms-original-file: 2025-05-01/ListDeletedWebAppsByLocation.json
 */
async function listDeletedWebAppByLocation() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.deletedWebApps.listByLocation("West US 2")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDeletedWebAppByLocation();
}

main().catch(console.error);
