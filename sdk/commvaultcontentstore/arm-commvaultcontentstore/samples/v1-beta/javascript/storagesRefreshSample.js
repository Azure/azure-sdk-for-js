// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContentStoreClient } = require("@azure/arm-commvaultcontentstore");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to refresh storage state from partner. Fetches latest compliance lock status from Commvault and updates the ARM resource.
 *
 * @summary refresh storage state from partner. Fetches latest compliance lock status from Commvault and updates the ARM resource.
 * x-ms-original-file: 2026-08-01-preview/Storages_Refresh_MaximumSet_Gen.json
 */
async function storagesRefreshMaximumSetRefreshStorageStateFromCommvault() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "65D4E6D7-7063-4C4B-BAC5-13C45474009E";
  const client = new ContentStoreClient(credential, subscriptionId);
  const result = await client.storages.refresh("rgcommvault", "myCloudAccount", "myStorage");
  console.log(result);
}

async function main() {
  await storagesRefreshMaximumSetRefreshStorageStateFromCommvault();
}

main().catch(console.error);
