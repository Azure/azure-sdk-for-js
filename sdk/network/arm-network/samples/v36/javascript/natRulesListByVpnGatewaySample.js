// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Retrieves all nat rules for a particular virtual wan vpn gateway.
 *
 * @summary Retrieves all nat rules for a particular virtual wan vpn gateway.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NatRuleList.json
 */
async function natRuleList() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const gatewayName = "gateway1";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.natRules.listByVpnGateway(resourceGroupName, gatewayName)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await natRuleList();
}

main().catch(console.error);
