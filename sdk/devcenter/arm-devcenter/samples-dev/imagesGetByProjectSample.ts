// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an image.
 *
 * @summary gets an image.
 * x-ms-original-file: 2026-01-01-preview/Images_GetByProject.json
 */
async function imagesGetByProject(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.images.getByProject(
    "rg1",
    "myProject",
    "~gallery~DefaultDevGallery~ContosoBaseImage",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await imagesGetByProject();
}

main().catch(console.error);
