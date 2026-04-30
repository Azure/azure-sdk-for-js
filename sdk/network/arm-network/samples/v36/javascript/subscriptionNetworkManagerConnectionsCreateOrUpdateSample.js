// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Create a network manager connection on this subscription.
 *
 * @summary Create a network manager connection on this subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerConnectionSubscriptionPut.json
 */
async function createOrUpdateSubscriptionNetworkManagerConnection() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const networkManagerConnectionName = "TestNMConnection";
  const parameters = {
    networkManagerId:
      "/subscriptions/subscriptionC/resourceGroup/rg1/providers/Microsoft.Network/networkManagers/testNetworkManager",
  };
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.subscriptionNetworkManagerConnections.createOrUpdate(
    networkManagerConnectionName,
    parameters,
  );
  console.log(result);
}

async function main() {
  await createOrUpdateSubscriptionNetworkManagerConnection();
}

main().catch(console.error);
