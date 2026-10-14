// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureSphereClient } from "@azure/arm-sphere";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates an image. Use this action when the image ID is unknown.
 *
 * @summary creates an image. Use this action when the image ID is unknown.
 * x-ms-original-file: 2024-04-01/PostUploadImageCatalog.json
 */
async function catalogsUploadImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new AzureSphereClient(credential, subscriptionId);
  await client.catalogs.uploadImage("MyResourceGroup1", "MyCatalog1", {
    properties: { image: "bXliYXNlNjRzdHJpbmc=" },
  });
}

async function main(): Promise<void> {
  await catalogsUploadImage();
}

main().catch(console.error);
