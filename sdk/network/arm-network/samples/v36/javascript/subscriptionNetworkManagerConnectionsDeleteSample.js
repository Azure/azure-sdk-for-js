// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Delete specified connection created by this subscription.
 *
 * @summary Delete specified connection created by this subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerConnectionSubscriptionDelete.json
 */
async function deleteSubscriptionNetworkManagerConnection() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const networkManagerConnectionName = "TestNMConnection";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subscriptionNetworkManagerConnections.delete(
    networkManagerConnectionName,
  );
  console.log(result);
}

async function main() {
  await deleteSubscriptionNetworkManagerConnection();
}

main().catch(console.error);
