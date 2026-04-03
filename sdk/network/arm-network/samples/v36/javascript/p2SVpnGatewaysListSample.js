// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the P2SVpnGateways in a subscription.
 *
 * @summary Lists all the P2SVpnGateways in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/P2SVpnGatewayList.json
 */
async function p2SVpnGatewayListBySubscription() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.p2SVpnGateways.list()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await p2SVpnGatewayListBySubscription();
}

main().catch(console.error);
