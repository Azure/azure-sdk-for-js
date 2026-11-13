// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an endpoint registration for a first-level nested resource type.
 *
 * @summary deletes an endpoint registration for a first-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_DeleteNestedResourceTypeFirst.json
 */
async function endpointRegistrationsDeleteNestedResourceTypeFirst() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.endpointRegistrations.deleteNestedResourceTypeFirst(
    "Microsoft.Contoso",
    "employees",
    "profiles",
    "primary",
  );
}

async function main() {
  await endpointRegistrationsDeleteNestedResourceTypeFirst();
}

main().catch(console.error);
