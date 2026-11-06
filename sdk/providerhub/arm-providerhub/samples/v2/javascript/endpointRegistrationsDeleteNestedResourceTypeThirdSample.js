// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an endpoint registration for a third-level nested resource type.
 *
 * @summary deletes an endpoint registration for a third-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_DeleteNestedResourceTypeThird.json
 */
async function endpointRegistrationsDeleteNestedResourceTypeThird() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.endpointRegistrations.deleteNestedResourceTypeThird(
    "Microsoft.Contoso",
    "employees",
    "profiles",
    "preferences",
    "notifications",
    "primary",
  );
}

async function main() {
  await endpointRegistrationsDeleteNestedResourceTypeThird();
}

main().catch(console.error);
