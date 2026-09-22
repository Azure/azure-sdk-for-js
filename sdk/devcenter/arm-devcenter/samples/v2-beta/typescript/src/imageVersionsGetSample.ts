// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DevCenterClient } from "@azure/arm-devcenter";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an image version.
 *
 * @summary gets an image version.
 * x-ms-original-file: 2026-01-01-preview/ImageVersions_Get.json
 */
async function versionsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "0ac520ee-14c0-480f-b6c9-0a90c58fffff";
  const client = new DevCenterClient(credential, subscriptionId);
  const result = await client.imageVersions.get(
    "rg1",
    "Contoso",
    "DefaultDevGallery",
    "Win11",
    "1.0.0",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await versionsGet();
}

main().catch(console.error);
