// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HorizonDbClient } from "@azure/arm-horizondb";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a private link resource.
 *
 * @summary gets a private link resource.
 * x-ms-original-file: 2026-10-01-preview/PrivateLinkResources_Get.json
 */
async function getAHorizonDBPrivateLinkResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ffffffff-ffff-ffff-ffff-ffffffffffff";
  const client = new HorizonDbClient(credential, subscriptionId);
  const result = await client.privateLinkResources.get(
    "example-resource-group",
    "example-cluster",
    "example-cluster",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getAHorizonDBPrivateLinkResource();
}

main().catch(console.error);
