// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists images for a gallery.
 *
 * @summary lists images for a gallery.
 * x-ms-original-file: 2026-01-01-preview/Images_ListByGallery.json
 */
async function imagesListByGallery() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.images.listByGallery("rg1", "Contoso", "DevGallery")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await imagesListByGallery();
}

main().catch(console.error);
