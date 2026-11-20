// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a nested resource type.
 *
 * @summary deletes a nested resource type.
 * x-ms-original-file: 2026-10-01/ResourceTypeRegistrations_DeleteNestedResourceTypeFirst.json
 */
async function resourceTypeRegistrationsDeleteNestedResourceTypeFirst() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.resourceTypeRegistrations.deleteNestedResourceTypeFirst(
    "Microsoft.Contoso",
    "testResourceType",
    "skills",
  );
}

async function main() {
  await resourceTypeRegistrationsDeleteNestedResourceTypeFirst();
}

main().catch(console.error);
