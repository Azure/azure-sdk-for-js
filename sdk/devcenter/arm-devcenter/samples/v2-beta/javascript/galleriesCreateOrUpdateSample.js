// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates a gallery.
 *
 * @summary creates or updates a gallery.
 * x-ms-original-file: 2026-01-01-preview/Galleries_Create.json
 */
async function galleriesCreateOrUpdate() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.galleries.createOrUpdate("rg1", "Contoso", "StandardGallery", {
    galleryResourceId:
      "/subscriptions/0ac520ee-14c0-480f-b6c9-0a90c58ffff/resourceGroups/rg1/providers/Microsoft.Compute/galleries/StandardGallery",
  });
  console.log(result);
}

async function main() {
  await galleriesCreateOrUpdate();
}

main().catch(console.error);
