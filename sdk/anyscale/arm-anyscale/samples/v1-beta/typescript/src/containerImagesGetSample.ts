// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a container image.
 *
 * @summary gets a container image.
 * x-ms-original-file: 2026-09-01/ContainerImages_Get.json
 */
async function containerImagesGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.containerImages.get("rganyscale", "testcloud", "testcontainerimage");
  console.log(result);
}

async function main(): Promise<void> {
  await containerImagesGet();
}

main().catch(console.error);
