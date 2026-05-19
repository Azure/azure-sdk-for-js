// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to generates the operations api for the given provider.
 *
 * @summary generates the operations api for the given provider.
 * x-ms-original-file: 2024-09-01/ProviderRegistrations_GenerateOperations.json
 */
async function providerRegistrationsGenerateOperations(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.providerRegistrations.generateOperations("Microsoft.Contoso");
  console.log(result);
}

async function main(): Promise<void> {
  await providerRegistrationsGenerateOperations();
}

main().catch(console.error);
