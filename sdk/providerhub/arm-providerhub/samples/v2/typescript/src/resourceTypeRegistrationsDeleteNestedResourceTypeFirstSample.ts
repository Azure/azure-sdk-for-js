// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ProviderHubClient } from "@azure/arm-providerhub";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes a nested resource type.
 *
 * @summary deletes a nested resource type.
 * x-ms-original-file: 2026-10-01/ResourceTypeRegistrations_DeleteNestedResourceTypeFirst.json
 */
async function resourceTypeRegistrationsDeleteNestedResourceTypeFirst(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.resourceTypeRegistrations.deleteNestedResourceTypeFirst(
    "Microsoft.Contoso",
    "testResourceType",
    "skills",
  );
}

async function main(): Promise<void> {
  await resourceTypeRegistrationsDeleteNestedResourceTypeFirst();
}

main().catch(console.error);
