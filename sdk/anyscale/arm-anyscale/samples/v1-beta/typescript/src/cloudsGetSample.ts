// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformClient } from "@azure/arm-anyscale";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a cloud resource
 *
 * @summary get a cloud resource
 * x-ms-original-file: 2026-09-01/Clouds_Get.json
 */
async function cloudsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "14AB8053-986C-414E-96B3-11D82B8B478D";
  const client = new PlatformClient(credential, subscriptionId);
  const result = await client.clouds.get("rganyscale", "testcloud");
  console.log(result);
}

async function main(): Promise<void> {
  await cloudsGet();
}

main().catch(console.error);
