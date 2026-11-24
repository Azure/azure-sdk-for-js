// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerInstanceManagementClient } from "@azure/arm-containerinstance";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the list of cached images on specific OS type for a subscription in a region.
 *
 * @summary get the list of cached images on specific OS type for a subscription in a region.
 * x-ms-original-file: 2026-07-01/CachedImagesList.json
 */
async function cachedImages(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ContainerInstanceManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.location.listCachedImages("westcentralus")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await cachedImages();
}

main().catch(console.error);
