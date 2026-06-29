// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetworkCloud } from "@azure/arm-networkcloud";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the properties of the provided rack SKU.
 *
 * @summary get the properties of the provided rack SKU.
 * x-ms-original-file: 2026-05-01-preview/RackSkus_Get.json
 */
async function getRackSKUResource(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "123e4567-e89b-12d3-a456-426655440000";
  const client = new NetworkCloud(credential, subscriptionId);
  const result = await client.rackSkus.get("rackSkuName");
  console.log(result);
}

async function main(): Promise<void> {
  await getRackSKUResource();
}

main().catch(console.error);
