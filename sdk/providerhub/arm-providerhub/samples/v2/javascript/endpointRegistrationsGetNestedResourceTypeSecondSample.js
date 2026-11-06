// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets an endpoint registration for a second-level nested resource type.
 *
 * @summary gets an endpoint registration for a second-level nested resource type.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_GetNestedResourceTypeSecond.json
 */
async function endpointRegistrationsGetNestedResourceTypeSecond() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.endpointRegistrations.getNestedResourceTypeSecond(
    "Microsoft.Contoso",
    "employees",
    "profiles",
    "preferences",
    "primary",
  );
  console.log(result);
}

async function main() {
  await endpointRegistrationsGetNestedResourceTypeSecond();
}

main().catch(console.error);
