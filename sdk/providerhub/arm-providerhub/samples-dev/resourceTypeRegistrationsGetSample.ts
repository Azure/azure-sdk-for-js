// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets a resource type details in the given subscription and provider.
 *
 * @summary gets a resource type details in the given subscription and provider.
 * x-ms-original-file: 2024-09-01/ResourceTypeRegistrations_Get.json
 */
async function resourceTypeRegistrationsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.resourceTypeRegistrations.get("Microsoft.Contoso", "employees");
  console.log(result);
}

async function main(): Promise<void> {
  await resourceTypeRegistrationsGet();
}

main().catch(console.error);
