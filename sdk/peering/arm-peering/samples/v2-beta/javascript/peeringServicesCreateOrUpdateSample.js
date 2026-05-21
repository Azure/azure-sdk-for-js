// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates a new peering service or updates an existing peering with the specified name under the given subscription and resource group.
 *
 * @summary creates a new peering service or updates an existing peering with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/CreatePeeringService.json
 */
async function createAPeeringService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  const result = await client.peeringServices.createOrUpdate("rgName", "peeringServiceName", {
    location: "eastus",
    peeringServiceLocation: "state1",
    peeringServiceProvider: "serviceProvider1",
    providerBackupPeeringLocation: "peeringLocation2",
    providerPrimaryPeeringLocation: "peeringLocation1",
  });
  console.log(result);
}

async function main() {
  await createAPeeringService();
}

main().catch(console.error);
