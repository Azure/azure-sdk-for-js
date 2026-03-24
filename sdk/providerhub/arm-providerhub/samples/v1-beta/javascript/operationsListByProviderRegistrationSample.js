// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ProviderHubClient } = require("@azure/arm-providerhub");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the operations supported by the given provider.
 *
 * @summary gets the operations supported by the given provider.
 * x-ms-original-file: 2024-09-01/Operations_ListByProviderRegistration.json
 */
async function operationsListByProviderRegistration() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "ab7a8701-f7ef-471a-a2f4-d0ebbf494f77";
  const client = new ProviderHubClient(credential, subscriptionId);
  const result = await client.operations.listByProviderRegistration("Microsoft.Contoso");
  console.log(result);
}

async function main() {
  await operationsListByProviderRegistration();
}

main().catch(console.error);
