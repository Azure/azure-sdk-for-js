// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to nOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region.
 *
 * @summary nOTE: This feature is currently in preview and still being tested for stability. Lists all available internet service providers for a specified Azure region.
 * x-ms-original-file: 2025-05-01/NetworkWatcherAvailableProvidersListGet.json
 */
async function getAvailableProvidersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.networkWatchers.listAvailableProviders("rg1", "nw1", {
    azureLocations: ["West US"],
    city: "seattle",
    country: "United States",
    state: "washington",
  });
  console.log(result);
}

async function main() {
  await getAvailableProvidersList();
}

main().catch(console.error);
