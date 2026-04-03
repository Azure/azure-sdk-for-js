// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all network manager connections created by this subscription.
 *
 * @summary List all network manager connections created by this subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerConnectionSubscriptionList.json
 */
async function listSubscriptionNetworkManagerConnection() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.subscriptionNetworkManagerConnections.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listSubscriptionNetworkManagerConnection();
}

main().catch(console.error);
