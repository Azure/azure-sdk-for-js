// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an endpoint registration.
 *
 * @summary deletes an endpoint registration.
 * x-ms-original-file: 2026-10-01/EndpointRegistrations_Delete.json
 */
async function endpointRegistrationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.endpointRegistrations.delete("Microsoft.Contoso", "employees", "primary");
}

async function main() {
  await endpointRegistrationsDelete();
}

main().catch(console.error);
