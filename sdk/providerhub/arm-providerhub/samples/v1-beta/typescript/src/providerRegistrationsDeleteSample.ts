// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a provider registration.
 *
 * @summary deletes a provider registration.
 * x-ms-original-file: 2024-09-01/ProviderRegistrations_Delete.json
 */
async function providerRegistrationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.providerRegistrations.delete("Microsoft.Contoso");
}

async function main(): Promise<void> {
  await providerRegistrationsDelete();
}

main().catch(console.error);
