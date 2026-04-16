// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to List all network manager routing configuration routing rules.
 *
 * @summary List all network manager routing configuration routing rules.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerRoutingRuleList.json
 */
async function listRoutingRules() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestRoutingConfig";
  const ruleCollectionName = "testRuleCollection";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routingRules.list(
    resourceGroupName,
    networkManagerName,
    configurationName,
    ruleCollectionName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRoutingRules();
}

main().catch(console.error);
