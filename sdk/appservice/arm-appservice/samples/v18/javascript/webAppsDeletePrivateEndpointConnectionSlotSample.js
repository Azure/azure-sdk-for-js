// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Deletes a private endpoint connection
 *
 * @summary description for Deletes a private endpoint connection
 * x-ms-original-file: 2025-05-01/DeleteSitePrivateEndpointConnectionSlot.json
 */
async function deleteAPrivateEndpointConnectionForASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  await client.webApps.deletePrivateEndpointConnectionSlot("rg", "testSite", "connection", "stage");
}

async function main() {
  await deleteAPrivateEndpointConnectionForASite();
}

main().catch(console.error);
