// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a gallery Application.
 *
 * @summary delete a gallery Application.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplication_Delete.json
 */
async function deleteAGalleryApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  await client.galleryApplications.delete(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
  );
}

async function main() {
  await deleteAGalleryApplication();
}

main().catch(console.error);
