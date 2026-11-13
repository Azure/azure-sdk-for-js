// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ContainerInstanceManagementClient } = require("@azure/arm-containerinstance");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the list of cached images on specific OS type for a subscription in a region.
 *
 * @summary get the list of cached images on specific OS type for a subscription in a region.
 * x-ms-original-file: 2026-07-01/CachedImagesList.json
 */
async function cachedImages() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.location.listCachedImages("westcentralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await cachedImages();
}

main().catch(console.error);
