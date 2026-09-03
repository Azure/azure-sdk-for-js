// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes a resource type
 *
 * @summary deletes a resource type
 * x-ms-original-file: 2024-09-01/ResourceTypeRegistrations_Delete.json
 */
async function resourceTypeRegistrationsDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  await client.resourceTypeRegistrations.delete("Microsoft.Contoso", "testResourceType");
}

async function main() {
  await resourceTypeRegistrationsDelete();
}

main().catch(console.error);
