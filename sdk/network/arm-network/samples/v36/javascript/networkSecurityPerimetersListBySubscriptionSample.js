// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all network security perimeters in a subscription.
 *
 * @summary List all network security perimeters in a subscription.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkSecurityPerimeterListAll.json
 */
async function networkSecurityPerimetersList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subId";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.networkSecurityPerimeters.listBySubscription()) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await networkSecurityPerimetersList();
}

main().catch(console.error);
