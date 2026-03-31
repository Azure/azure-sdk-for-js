// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the category of ResourceHealthMetadata to use for the given site as a collection
 *
 * @summary description for Gets the category of ResourceHealthMetadata to use for the given site as a collection
 * x-ms-original-file: 2025-05-01/ListResourceHealthMetadataBySite.json
 */
async function listResourceHealthMetadataForASite() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4adb32ad-8327-4cbb-b775-b84b4465bb38";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.resourceHealthMetadata.listBySite(
    "Default-Web-NorthCentralUS",
    "newsiteinnewASE-NCUS",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listResourceHealthMetadataForASite();
}

main().catch(console.error);
