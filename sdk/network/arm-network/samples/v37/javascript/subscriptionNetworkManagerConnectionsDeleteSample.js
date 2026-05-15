// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete specified connection created by this subscription.
 *
 * @summary delete specified connection created by this subscription.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionSubscriptionDelete.json
 */
async function deleteSubscriptionNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  await client.subscriptionNetworkManagerConnections.delete("TestNMConnection");
}

async function main() {
  await deleteSubscriptionNetworkManagerConnection();
}

main().catch(console.error);
