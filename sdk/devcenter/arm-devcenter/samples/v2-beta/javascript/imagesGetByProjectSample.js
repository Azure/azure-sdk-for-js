// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { DevCenterClient } = require("@azure/arm-devcenter");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an image.
 *
 * @summary gets an image.
 * x-ms-original-file: 2026-01-01-preview/Images_GetByProject.json
 */
async function imagesGetByProject() {
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

async function main() {
  await imagesGetByProject();
}

main().catch(console.error);
