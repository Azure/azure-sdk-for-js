// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes an endpoint registration.
 *
 * @summary deletes an endpoint registration.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_Delete.json
 */
async function endpointRegistrationsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.endpointRegistrations.delete("Microsoft.Contoso", "employees", "primary");
}

async function main(): Promise<void> {
  await endpointRegistrationsDelete();
}

main().catch(console.error);
