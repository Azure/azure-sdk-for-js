// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PlatformClient } = require("@azure/arm-anyscale");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a container image.
 *
 * @summary deletes a container image.
 * x-ms-original-file: 2026-09-01/ContainerImages_Delete.json
 */
async function containerImagesDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  await client.containerImages.delete("rganyscale", "testcloud", "testcontainerimage");
}

async function main() {
  await containerImagesDelete();
}

main().catch(console.error);
