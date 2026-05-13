// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PeeringManagementClient } = require("@azure/arm-peering");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes an existing peering service with the specified name under the given subscription and resource group.
 *
 * @summary deletes an existing peering service with the specified name under the given subscription and resource group.
 * x-ms-original-file: 2025-05-01/DeletePeeringService.json
 */
async function deleteAPeeringService() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "subId";
  const client = new PeeringManagementClient(credential, subscriptionId);
  await client.peeringServices.delete("rgName", "peeringServiceName");
}

async function main() {
  await deleteAPeeringService();
}

main().catch(console.error);
