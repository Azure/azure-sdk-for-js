// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a resource type sku.
 *
 * @summary deletes a resource type sku.
 * x-ms-original-file: 2024-09-01/Skus_Delete.json
 */
async function skusDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.skus.delete("Microsoft.Contoso", "testResourceType", "testSku");
}

async function main(): Promise<void> {
  await skusDelete();
}

main().catch(console.error);
