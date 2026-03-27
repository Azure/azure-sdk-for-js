// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { WebSiteManagementClient } = require("@azure/arm-appservice");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to description for Gets the category of ResourceHealthMetadata to use for the given site
 *
 * @summary description for Gets the category of ResourceHealthMetadata to use for the given site
 * x-ms-original-file: 2025-05-01/GetResourceHealthMetadataBySite_Slot.json
 */
async function getResourceHealthMetadata() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "4adb32ad-8327-4cbb-b775-b84b4465bb38";
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const result = await client.resourceHealthMetadata.getBySiteSlot(
    "Default-Web-NorthCentralUS",
    "newsiteinnewASE-NCUS",
    "Production",
  );
  console.log(result);
}

async function main() {
  await getResourceHealthMetadata();
}

main().catch(console.error);
