// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { NetworkManagementClient } = require("@azure/arm-network");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Gets the specified rule from a route filter.
 *
 * @summary Gets the specified rule from a route filter.
 * x-ms-original-file: specification/network/resource-manager/Microsoft.Network/Network/stable/2025-05-01/examples/RouteFilterRuleGet.json
 */
async function routeFilterRuleGet() {
  const subscriptionId = process.env["NETWORK_SUBSCRIPTION_ID"] || "subid";
  const resourceGroupName = process.env["NETWORK_RESOURCE_GROUP"] || "rg1";
  const routeFilterName = "filterName";
  const ruleName = "filterName";
  const credential = new DefaultAzureCredential();
  const client = new NetworkManagementClient(credential, subscriptionId);
  const result = await client.routeFilterRules.get(resourceGroupName, routeFilterName, ruleName);
  console.log(result);
}

async function main() {
  await routeFilterRuleGet();
}

main().catch(console.error);
