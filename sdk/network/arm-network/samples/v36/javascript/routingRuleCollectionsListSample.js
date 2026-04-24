// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Lists all the rule collections in a routing configuration, in a paginated format.
 *
 * @summary Lists all the rule collections in a routing configuration, in a paginated format.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/NetworkManagerRoutingRuleCollectionList.json
 */
async function listRoutingRuleCollections() {
  const subscriptionId =
    process.env["NETWORK_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const networkManagerName = "testNetworkManager";
  const configurationName = "myTestRoutingConfig";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routingRuleCollections.list(
    resourceGroupName,
    networkManagerName,
    configurationName,
  )) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main() {
  await listRoutingRuleCollections();
}

main().catch(console.error);
