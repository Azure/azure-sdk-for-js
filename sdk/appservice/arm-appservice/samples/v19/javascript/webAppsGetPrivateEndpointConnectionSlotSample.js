// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets a private endpoint connection
 *
 * @summary description for Gets a private endpoint connection
 * x-ms-original-file: 2025-05-01/GetSitePrivateEndpointConnectionSlot.json
 */
async function getAPrivateEndpointConnectionForASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "34adfa4f-cedf-4dc0-ba29-b6d1a69ab345";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.webApps.getPrivateEndpointConnectionSlot(
    "rg",
    "testSite",
    "connection",
    "stage",
  );
  console.log(result);
}

async function main() {
  await getAPrivateEndpointConnectionForASite();
}

main().catch(console.error);
