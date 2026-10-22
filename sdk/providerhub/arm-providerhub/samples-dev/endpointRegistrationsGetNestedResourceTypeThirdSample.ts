// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets an endpoint registration for a third-level nested resource type.
 *
 * @summary gets an endpoint registration for a third-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_GetNestedResourceTypeThird.json
 */
async function endpointRegistrationsGetNestedResourceTypeThird(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.endpointRegistrations.getNestedResourceTypeThird(
    "Microsoft.Contoso",
    "employees",
    "profiles",
    "preferences",
    "notifications",
    "primary",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await endpointRegistrationsGetNestedResourceTypeThird();
}

main().catch(console.error);
