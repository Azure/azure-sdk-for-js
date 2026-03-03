// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Deletes a web, mobile, or API app, or one of the deployment slots.
 *
 * @summary description for Deletes a web, mobile, or API app, or one of the deployment slots.
 * x-ms-original-file: 2025-05-01/DeleteWebApp.json
 */
async function deleteWebApp() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.delete("testrg123", "sitef6141");
}

async function main() {
  await deleteWebApp();
}

main().catch(console.error);
