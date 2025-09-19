// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create or update a gallery image definition.
 *
 * @summary Create or update a gallery image definition.
 * x-ms-original-file: specification/compute/resource-manager/Microsoft.Compute/GalleryRP/stable/2024-03-03/examples/galleryExamples/GalleryImage_Create.json
 */
async function createOrUpdateASimpleGalleryImage() {
  const subscriptionId = process.env["COMPUTE_SUBSCRIPTION_ID"] || "{subscription-id}";
  const resourceGroupName = process.env["COMPUTE_RESOURCE_GROUP"] || "myResourceGroup";
  const galleryName = "myGalleryName";
  const galleryImageName = "myGalleryImageName";
  const galleryImage = {
    hyperVGeneration: "V1",
    identifier: {
      offer: "myOfferName",
      publisher: "myPublisherName",
      sku: "mySkuName",
    },
    location: "West US",
    osState: "Generalized",
    osType: "Windows",
  };
  const credential = new DefaultAzureCredential();
  const client = new ComputeManagementClient(credential, subscriptionId);
  const result = await client.galleryImages.beginCreateOrUpdateAndWait(
    resourceGroupName,
    galleryName,
    galleryImageName,
    galleryImage,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateASimpleGalleryImage();
}

main().catch(console.error);
