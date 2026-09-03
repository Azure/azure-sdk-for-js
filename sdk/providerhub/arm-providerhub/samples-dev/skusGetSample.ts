// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the sku details for the given resource type and sku name.
 *
 * @summary gets the sku details for the given resource type and sku name.
 * x-ms-original-file: 2024-09-01/Skus_Get.json
 */
async function skusGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.skus.get("Microsoft.Contoso", "testResourceType", "testSku");
  console.log(result);
}

async function main(): Promise<void> {
  await skusGet();
}

main().catch(console.error);
