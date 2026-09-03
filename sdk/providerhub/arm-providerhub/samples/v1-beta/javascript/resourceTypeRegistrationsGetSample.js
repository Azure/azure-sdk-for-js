// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a resource type details in the given subscription and provider.
 *
 * @summary gets a resource type details in the given subscription and provider.
 * x-ms-original-file: 2024-09-01/ResourceTypeRegistrations_Get.json
 */
async function resourceTypeRegistrationsGet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.resourceTypeRegistrations.get("Microsoft.Contoso", "employees");
  console.log(result);
}

async function main() {
  await resourceTypeRegistrationsGet();
}

main().catch(console.error);
