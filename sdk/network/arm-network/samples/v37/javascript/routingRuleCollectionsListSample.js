// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all the rule collections in a routing configuration, in a paginated format.
 *
 * @summary lists all the rule collections in a routing configuration, in a paginated format.
 * x-ms-original-file: 2025-05-01/NetworkManagerRoutingRuleCollectionList.json
 */
async function listRoutingRuleCollections() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetworkManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.routingRuleCollections.list(
    "rg1",
    "testNetworkManager",
    "myTestRoutingConfig",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRoutingRuleCollections();
}

main().catch(console.error);
