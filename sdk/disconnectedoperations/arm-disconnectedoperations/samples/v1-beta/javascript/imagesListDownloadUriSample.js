// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DisconnectedOperationsManagementClient } = require("@azure/arm-disconnectedoperations");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the URI to download the image.
 *
 * @summary get the URI to download the image.
 * x-ms-original-file: 2025-06-01-preview/Images_ListDownloadUri_MaximumSet_Gen.json
 */
async function imagesListDownloadUri() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "51DB5DE7-A66C-4789-BFFF-9F75C95A0201";
  const client = new DisconnectedOperationsManagementClient(credential, subscriptionId);
  const result = await client.images.listDownloadUri(
    "rgdisconnectedOperations",
    "g_-5-160",
    "1Q6lGV4V65j-1",
  );
  console.log(result);
}

async function main() {
  await imagesListDownloadUri();
}

main().catch(console.error);
