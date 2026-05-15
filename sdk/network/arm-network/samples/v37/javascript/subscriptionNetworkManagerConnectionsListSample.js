// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all network manager connections created by this subscription.
 *
 * @summary list all network manager connections created by this subscription.
 * x-ms-original-file: 2025-05-01/NetworkManagerConnectionSubscriptionList.json
 */
async function listSubscriptionNetworkManagerConnection() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
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
