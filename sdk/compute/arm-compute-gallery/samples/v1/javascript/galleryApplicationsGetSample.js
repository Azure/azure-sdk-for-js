// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute-gallery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to retrieves information about a gallery Application Definition.
 *
 * @summary retrieves information about a gallery Application Definition.
 * x-ms-original-file: 2024-03-03/galleryExamples/GalleryApplication_Get.json
 */
async function getAGalleryApplication() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "{subscription-id}";
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryApplications.get(
    "myResourceGroup",
    "myGalleryName",
    "myGalleryApplicationName",
  );
  console.log(result);
}

async function main() {
  await getAGalleryApplication();
}

main().catch(console.error);
